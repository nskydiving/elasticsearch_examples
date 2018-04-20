GET _search
{
  "query": {
    "match_all": {}
  }
}

#    +--- Index name
#    |       +--- Type name
#    |       |     +--- Document ID
#    |       |     |
#    V       V     V
PUT /library/books/1
{
  "title": "Norwegian Wood",
  "name": {
    "first": "Haruki",
    "last": "Murakami"
  },
  "publish_date": "1987-09-04T00:00:00+0900",
  "price": 19.95
}

GET /library/books/1

POST /library/books/
{
  "title": "Kafka on the Shore",
  "name": {
    "first": "Haruki",
    "last": "Murakami"
  },
  "publish_date": "2002-09-12T00:00:00+0900",
  "price": 19.95
}

# POST /library/books/ で取得した id を指定してください
GET /library/books/AVvbMpWIT3Zks7DdP3lQ

PUT /library/books/1
{
  "title": "Norwegian Wood",
  "name": {
    "first": "Haruki",
    "last": "Murakami"
  },
  "publish_date": "1987-09-04T00:00:00+0900",
  "price": 29.95
}

GET /library/books/1

POST /library/books/1/_update
{
  "doc": {
    "price": 10
  }
}

GET /library/books/1

POST /library/books/1/_update
{
  "doc": {
    "price_jpy": 1800
  }
}

GET /library/books/1

DELETE /library/books/1

GET /library/books/1

DELETE /library

GET /libray/books/2

DELETE /library

POST /library/books/_bulk
{"index": {"_id": 1}}
{"title": "The quick brown fox", "price": 5}
{"index": {"_id": 2}}
{"title": "The quick brown fox jumps over the lazy dog", "price": 15}
{"index": {"_id": 3}}
{"title": "The quick brown fox jumps over the quick dog", "price": 8}
{"index": {"_id": 4}}
{"title": "Brown fox and brown dog", "price": 2}
{"index": {"_id": 5}}
{"title": "Lazy dog", "price": 9}

GET /library/books/_search

GET /library/books/_search
{
  "query": {
    "match": {
      "title": "fox"
    }
  }
}

GET /library/books/_search
{
  "query": {
    "match": {
      "title": "quick dog"
    }
  }
}

GET /library/books/_search
{
  "query": {
    "match_phrase": {
      "title": "quick dog"
    }
  }
}

GET /library/books/_search?explain
{
  "query": {
    "match": {
      "title": "quick"
    }
  }
}

GET /library/books/_search
{
  "query": {
    "bool": {
      "must": [
        {
          "match": {
            "title": "quick"
          }
        },
        {
          "match_phrase": {
            "title": "lazy dog"
          }
        }
      ]
    }
  }
}

GET /library/books/_search
{
  "query": {
    "bool": {
      "should": [
        {
          "match_phrase": {
            "title": {
              "query": "quick dog",
              "boost": 0.5
            }
          }
        },
        {
          "match_phrase": {
            "title": {
              "query": "lazy dog"
            }
          }
        }
      ]
    }
  }
}

GET /library/books/_search
{
  "query": {
    "bool": {
      "should": [
        {
          "match_phrase": {
            "title": {
              "query": "quick dog",
              "boost": 0.5
            }
          }
        },
        {
          "match_phrase": {
            "title": {
              "query": "lazy dog"
            }
          }
        }
      ]
    }
  },
  "highlight": {
    "fields": {
      "title": {}
    }
  }
}

GET /library/books/_search
{
  "query": {
    "bool": {
      "filter": {
        "range": {
          "price": {
            "gte": 5,
            "lte": 10
          }
        }
      }
    }
  }
}

GET /library/books/_search
{
  "query": {
    "bool": {
      "must": [{
        "match_phrase": {
          "title": "lazy dog"
        }
        }],
      "filter": {
        "range": {
          "price": {
            "gte": 5
          }
        }
      }
    }
  }
}

DELETE /library

POST /library/books/_bulk
{"index": {"_id": 1}}
{"title": "The quick brown fox", "price": 5}
{"index": {"_id": 2}}
{"title": "The quick brown fox jumps over the lazy dog", "price": 15}
{"index": {"_id": 3}}
{"title": "The quick brown fox jumps over the quick dog", "price": 8}
{"index": {"_id": 4}}
{"title": "Brown fox and brown dog", "price": 2}
{"index": {"_id": 5}}
{"title": "Lazy dog", "price": 9}

GET /library/_mapping

PUT /library/books/_mapping
{
  "books": {
    "properties": {
      "my_new_field": {
        "type": "text"
      }
    }
  }
}

GET /library/_mapping

PUT /library/books/_mapping
{
  "books": {
    "properties": {
      "english_field": {
        "type": "text",
        "analyzer": "english"
      }
    }
  }
}

GET /library/_mapping

PUT /library/books/_mapping
{
  "books": {
    "properties": {
      "english_field": {
        "type": "double"
      }
    }
  }
}

POST /log/transactions
{
  "id": 234571
}

POST /log/transactions
{
  "id": 1392.223
}

GET /log/transactions/_search
{
  "query": {
    "bool": {
      "filter": {
        "range": {
          "id": {
            "gt": 1392
          }
        }
      }
    }
  }
}

GET /log/_mapping

GET /log/_search

DELETE /library

POST /library/books/_bulk
{"index": {"_id": 1}}
{"title": "The quick brown fox", "price": 5}
{"index": {"_id": 2}}
{"title": "The quick brown fox jumps over the lazy dog", "price": 15}
{"index": {"_id": 3}}
{"title": "The quick brown fox jumps over the quick dog", "price": 8}
{"index": {"_id": 4}}
{"title": "Brown fox and brown dog", "price": 2}
{"index": {"_id": 5}}
{"title": "Lazy dog", "price": 9}

GET /library/_analyze
{
  "tokenizer": "standard",
  "text": "Brown fox brown dog"
}

GET /library/_analyze
{
  "tokenizer": "standard",
  "filter": ["lowercase"],
  "text": "Brown fox brown dog"
}

GET /library/_analyze
{
  "tokenizer": "standard",
  "filter": ["lowercase","unique"],
  "text": "Brown brown brown fox brown dog"
}

GET /library/_analyze
{
  "tokenizer": "standard",
  "filter": ["lowercase"],
  "text": "THE quick.brown_FOx Jumped! $19.95 @ 3.0"
}

GET /library/_analyze
{
  "tokenizer": "letter",
  "filter": ["lowercase"],
  "text": "THE quick.brown_FOx Jumped! $19.95 @ 3.0"
}

GET /library/_analyze
{
  "tokenizer": "kuromoji_tokenizer",
  "text": "記者が汽車で帰社した"
}
