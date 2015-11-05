# JavaScript Turtle parser performance tests
Quick repository to compare performance.

```
npm install --ignore-scripts
./n3-spec.js                    # N3.js Turtle specification test
./n3-perf.js dbpedia.ttl.gz     # N3.js Turtle parsing performance test
./rdflib-perf.js dbpedia.ttl.gz # rdflib.js Turtle parsing performance test
```

## Do not use in production
This repository was quickly derived from the [N3.js](https://github.com/RubenVerborgh/N3.js) specification and performance tests. It is highly recommended to use the original tests instead.
