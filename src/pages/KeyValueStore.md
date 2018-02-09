# KeyValueStore

Simple persisten key-value store for frontend with REST API.

Keys are segmented strings where each segment separates data to key-spaces. Segments can be chosen by client arbitrarily, 
which ever best suits its needs. Segments can be used for querying with key patterns.

Values are arbitrary as they are not processed by the service in any way.

One of the features is key-value pair *"ownership"*. Pairs can be associated with the user by user id and only that user 
can access the pairs. Pairs can be not associated with any user, so they can be accessed by anyone.

## Featues

* CRUD value by key
* Query values by key pattern
* Get keys by key pattern
* Authentication and access restrictions
* Load data from disk (JSON files) on startup (without file watchers)

## Notes

Service does not implement storage itself. Instead third-party storage system is used (i.e. Redis).

Feature for loading files from disk is intended for static readonly data. For example, predefined configs from VCS may 
be distributed with the service for some application. Data from disk cannot be changed during service life-cycle, 
not by API, not by modification of the files.

## Service Glossary
* Set - logical group of key-value pairs that represents one entity. Like table in database.
* Segment - part of the key separated with colon (':'). Segments can contain child segments.
    * Prime segment - segment without child segments.
    * Pattern segment - segment with '*' value; represents any segment value. 
    * Concrete segment - opposite to pattern segment i.e. segment with concrete value.
    * Global set identifier - first key segment common for all pairs in set.
* Key - string with segments used to identify value.
    * Full key - key where all segments are prime and concrete;
      such keys, if present in store, point to exactly one record.
    * Pattern key - key where some segments are pattern segments;
      such keys can point to many records in store.
* Entry, record, pair - key-value pair; used interchangeably.

## API

**Note**: For all methods JWT authentication token should be set to Authorization header with 'Bearer' schema.

### /{set} (GET)

Returns all pairs that match the key. 

Key can be partial, meaning some segments at the end may be replaced with `*` or ommited 
(i.e. `some:key:*` is the same as `some:key`).

Only values accessible by the authenticated user are returned including the shared ones.

`404` status code is returned if global key set identifier (`set` parameter) not found.

+ Parameters:
	+ set: `URL` (string) - global key set identifier.
	+ key (optional): `Query` (string) - partial or full value key, if not set `*` is used.

+ Response 200 (application\json):
	```
    // for example `/view` requested
    // view pairs have keys like 'view:incident:1' and numbers as values
    {
        "view": {
            "incident": {
                "1": 1,
                "2": 2,
                "3": 3
            }
            "serviceRequest": {
                "1": 1,
                "2": 2,
                "3": 3
            }
        }
    }

    // if `/view?key=incident` were requested the result would be
    {
        "view": {
            "incident": {
                "1": 1,
                "2": 2,
                "3": 3
            }
        }
    }
    
    // if `/view?key=incident:4` were requested the result would be
    {
        "view": {
            "incident": {}
        }
    }

	```

### /{set} (POST)

Sets value to specified **full** key. If value with given key already exists it's overwritten.

+ Parameters:
	+ set: `URL` (string) - global key set identifier.
	+ key: `Body` (string) - full value key.
	+ value: `Body` (string) - value.

+ Request `/view (POST)` (application/json):
    ```
    {
        "key": "incident:4",
        "value": 4
    }
    ```

+ Response 204 (application/json)

### /{set} (DELETE)

Deletes key-value pair with specified **full** key. If key doesn't exist nothing happens.

+ Parameters:
	+ set: `URL` (string) - global key set identifier.
	+ key: `Query` (string) - full key.

+ Response 204 (application/json)