const docsData = [
    {
        section: 1,
        title: "Simple GET Request",
        description: "Basic GET request through the proxy gateway",

        additionalDescription:
            "This request fetches the target URL content using the default GET method through the ScrapeDo gateway.",

        note:
            "Make sure the target URL is properly URL encoded if it contains query parameters.",

        examples: {
            curl: `curl "15.235.85.189:9090/fetch?url=https://httpbin.org/get" \\
  -H "scrapedo-key: your_scrapedo_key"`,

            python: `import requests

url = "http://15.235.85.189:9090/fetch"

params = { "url": "https://httpbin.org/get" }
headers = { "scrapedo-key": "your_scrapedo_key" }

response = requests.get(url, params=params, headers=headers)
print(response.status_code)
print(response.text)`
        },

        parameters: {
            url: "https://httpbin.org/get"
        },

        method: "GET"
    },

    {
        section: 2,
        title: "GET Request with Query Params",
        description:
            "GET request with additional query parameters passed through the proxy",

        additionalDescription:
            "Extra query parameters are forwarded to the destination URL automatically.",

        note:
            "Avoid sending sensitive information directly in query params since URLs may be logged.",

        examples: {
            curl: `curl "15.235.85.189:9090/fetch?url=https://httpbin.org/get&param1=value1&param2=value2" \\
  -H "scrapedo-key: your_scrapedo_key"`,

            python: `import requests

url = "http://15.235.85.189:9090/fetch"

params = {
  "url": "https://httpbin.org/get",
  "param1": "value1",
  "param2": "value2"
}
headers = { "scrapedo-key": "your_scrapedo_key" }

response = requests.get(url, params=params, headers=headers)
print(response.json())`
        },

        parameters: {
            url: "https://httpbin.org/get",
            param1: "value1",
            param2: "value2"
        },

        method: "GET"
    },
    {
        section: 3,
        title: "POST Request with Payload",
        description: "POST request with JSON payload through the proxy gateway",

        additionalDescription:
            "This example sends a JSON payload to the target API using the POST method via the ScrapeDo proxy gateway.",

        note:
            "The payload value must be JSON stringified before sending in the query parameters.",

        examples: {
            curl: `curl "15.235.85.189:9090/fetch?url=https://httpbin.org/post&method=POST&payload={\\"name\\":\\"mahin\\",\\"age\\":25}" \\
  -H "scrapedo-key: your_scrapedo_key"`,

            python: `import requests
import json

url = "http://15.235.85.189:9090/fetch"

params = {
    "url": "https://httpbin.org/post",
    "method": "POST",
    "payload": json.dumps({
        "name": "mahin",
        "age": 25
    })
}

headers = {
    "scrapedo-key": "your_scrapedo_key"
}

response = requests.get(url, params=params, headers=headers)

print(response.text)`
        },

        parameters: {
            url: "https://httpbin.org/post",
            method: "POST",
            payload: {
                name: "mahin",
                age: 25
            }
        },

        method: "POST"
    }, {
        section: 4,
        title: "Request with Custom Headers",
        description: "Send custom HTTP headers through the proxy gateway",

        additionalDescription:
            "This example demonstrates how to forward custom request headers such as User-Agent and Accept-Language to the target website.",

        note:
            "To enable custom headers forwarding, set proxy_params.customHeaders to true.",

        examples: {
            curl: `curl "15.235.85.189:9090/fetch?url=https://httpbin.org/headers&headers={\\"User-Agent\\":\\"Mozilla/5.0\\"}&proxy_params={\\"customHeaders\\":true}" \\
  -H "scrapedo-key: your_scrapedo_key"`,

            python: `import requests
import json

url = "http://15.235.85.189:9090/fetch"

params = {
    "url": "https://httpbin.org/headers",
    "headers": json.dumps({
        "User-Agent": "Mozilla/5.0",
        "Accept-Language": "en-US"
    }),
    "proxy_params": json.dumps({
        "customHeaders": True
    })
}

headers = {
    "scrapedo-key": "your_scrapedo_key"
}

response = requests.get(url, params=params, headers=headers)

print(response.json())`
        },

        parameters: {
            url: "https://httpbin.org/headers",
            headers: {
                "User-Agent": "Mozilla/5.0",
                "Accept-Language": "en-US"
            },
            proxy_params: {
                customHeaders: true
            }
        },

        method: "GET"
    }, {
        section: 5,
        title: "Geo-Targeted Request",
        description: "Send requests through proxies located in a specific country",

        additionalDescription:
            "This example routes the request through a proxy server located in the specified country using the geoCode parameter.",

        note:
            "Use ISO country codes such as US, IN, GB, or DE for geo targeting.",

        examples: {
            curl: `curl "15.235.85.189:9090/fetch?url=https://httpbin.org/ip&proxy_params={\\"geoCode\\":\\"US\\"}" \\
  -H "scrapedo-key: your_scrapedo_key"`,

            python: `import requests
import json

url = "http://15.235.85.189:9090/fetch"

params = {
    "url": "https://httpbin.org/ip",
    "proxy_params": json.dumps({
        "geoCode": "us"
    })
}

headers = {
    "scrapedo-key": "your_scrapedo_key"
}

response = requests.get(url, params=params, headers=headers)

print(response.text)`
        },

        parameters: {
            url: "https://httpbin.org/ip",
            proxy_params: {
                geoCode: "US"
            }
        },

        method: "GET"
    },
    {
        section: 6,
        title: "JavaScript Rendering Request",
        description: "Render JavaScript-heavy pages before returning the response",

        additionalDescription:
            "This example enables browser rendering so dynamic JavaScript content is fully loaded before scraping.",

        note:
            "JavaScript rendering may increase response time because the page is processed in a headless browser.",

        examples: {
            curl: `curl "15.235.85.189:9090/fetch?url=https://example.com&proxy_params={\\"render\\":true}" \\
  -H "scrapedo-key: your_scrapedo_key"`,

            python: `import requests
import json

url = "http://15.235.85.189:9090/fetch"

params = {
    "url": "https://example.com",
    "proxy_params": json.dumps({
        "render": True
    })
}

headers = {
    "scrapedo-key": "your_scrapedo_key"
}

response = requests.get(url, params=params, headers=headers)

print(response.text)`
        },

        parameters: {
            url: "https://example.com",
            proxy_params: {
                render: true
            }
        },

        method: "GET"
    }, {
        section: 7,
        title: "Premium Proxy (Super Mode)",
        description: "Use premium proxy infrastructure for improved reliability and anti-bot bypassing",

        additionalDescription:
            "This example enables super mode which uses higher quality proxy networks optimized for difficult targets and protected websites.",

        note:
            "Super mode may consume more credits compared to standard requests.",

        examples: {
            curl: `curl "15.235.85.189:9090/fetch?url=https://httpbin.org/get&proxy_params={\\"super\\":true}" \\
  -H "scrapedo-key: your_scrapedo_key"`,

            python: `import requests
import json

url = "http://15.235.85.189:9090/fetch"

params = {
    "url": "https://httpbin.org/get",
    "proxy_params": json.dumps({
        "super": True
    })
}

headers = {
    "scrapedo-key": "your_scrapedo_key"
}

response = requests.get(url, params=params, headers=headers)

print(response.status_code)`
        },

        parameters: {
            url: "https://httpbin.org/get",
            proxy_params: {
                super: true
            }
        },

        method: "GET"
    }, {
        section:8,
        title: "Regional Geo-Targeted Request (with super)",
        description: "Use premium proxies with regional geo targeting",

        additionalDescription:
            "This example combines super mode with regional geo targeting to route requests through premium proxies from a specific region.",

        note:
            "Supported regionalGeoCode values may include regions such as europe, asia, or north-america depending on your proxy configuration.",

        examples: {
            curl: `curl "15.235.85.189:9090/fetch?url=https://httpbin.org/get&proxy_params={\\"super\\":true,\\"regionalGeoCode\\":\\"europe\\"}" \\
  -H "scrapedo-key: your_scrapedo_key"`,

            python: `import requests
import json

url = "http://15.235.85.189:9090/fetch"

params = {
    "url": "https://httpbin.org/get",
    "proxy_params": json.dumps({
        "super": True,
        "regionalGeoCode": "europe"
    })
}

headers = {
    "scrapedo-key": "your_scrapedo_key"
}

response = requests.get(url, params=params, headers=headers)

print(response.status_code)`
        },

        parameters: {
            url: "https://httpbin.org/get",
            proxy_params: {
                super: true,
                regionalGeoCode: "europe"
            }
        },

        method: "GET"
    }, {
        section: 9,
        title: "Session Id",
        description: "Maintain sticky sessions across multiple requests",

        additionalDescription:
            "This example uses a sessionId to route requests through the same proxy session for improved consistency across requests.",

        note:
            "Using the same sessionId helps preserve IP affinity and session continuity between requests.",

        examples: {
            curl: `curl "15.235.85.189:9090/fetch?url=https://httpbin.org/get&proxy_params={\\"sessionId\\":123}" \\
  -H "scrapedo-key: your_scrapedo_key"`,

            python: `import requests
import json

url = "http://15.235.85.189:9090/fetch"

params = {
    "url": "https://httpbin.org/get",
    "proxy_params": json.dumps({
        "sessionId": 123
    })
}

headers = {
    "scrapedo-key": "your_scrapedo_key"
}

response = requests.get(url, params=params, headers=headers)

print(response.status_code)`
        },

        parameters: {
            url: "https://httpbin.org/get",
            proxy_params: {
                sessionId: 123
            }
        },

        method: "GET"
    }, {
        section: 10,
        title: "Set Cookies",
        description: "Send custom cookies with the request",

        additionalDescription:
            "This example demonstrates how to attach custom cookies that will be forwarded to the target website.",

        note:
            "Cookies must be passed as a JSON object and encoded using json.dumps in Python examples.",

        examples: {
            curl: `curl "15.235.85.189:9090/fetch?url=https://httpbin.org/cookies&setCookies={\\"cookie1\\":\\"value1\\",\\"cookie2\\":\\"value2\\"}" \\
  -H "scrapedo-key: your_scrapedo_key"`,

            python: `import requests
import json

url = "http://15.235.85.189:9090/fetch"

cookie_obj = {
    "cookie1": "value1",
    "cookie2": "value2"
}

params = {
    "url": "https://httpbin.org/cookies",
    "setCookies": json.dumps(cookie_obj)
}

headers = {
    "scrapedo-key": "your_scrapedo_key"
}

response = requests.get(url, params=params, headers=headers)

print(f"Status Code: {response.status_code}")
print(response.json())`
        },

        parameters: {
            url: "https://httpbin.org/cookies",
            setCookies: {
                cookie1: "value1",
                cookie2: "value2"
            }
        },

        method: "GET"
    }, {
        section: 11,
        title: "Disable Redirection",
        description: "Prevent automatic following of HTTP redirects",

        additionalDescription:
            "This example disables automatic redirection handling so the original redirect response is returned directly.",

        note:
            "Useful when you want to inspect redirect headers or manually control redirect behavior.",

        examples: {
            curl: `curl "15.235.85.189:9090/fetch?url=https://httpbin.org/get&proxy_params={\\"disableRedirection\\":true}" \\
  -H "scrapedo-key: your_scrapedo_key"`,

            python: `import requests
import json

url = "http://15.235.85.189:9090/fetch"

params = {
    "url": "https://httpbin.org/get",
    "proxy_params": json.dumps({
        "disableRedirection": "true"
    }),
}

headers = {
    "scrapedo-key": "your_scrapedo_key"
}

response = requests.get(url, params=params, headers=headers)

print(response.status_code)
print(response.text)`
        },

        parameters: {
            url: "https://httpbin.org/get",
            proxy_params: {
                disableRedirection: true
            }
        },

        method: "GET"
    }, {
        section: 12,
        title: "Disable Retry",
        description: "Disable automatic retry attempts for failed requests",

        additionalDescription:
            "This example prevents the proxy gateway from retrying requests automatically when failures occur.",

        note:
            "Disabling retries can reduce request latency but may increase the chance of failed responses.",

        examples: {
            curl: `curl "15.235.85.189:9090/fetch?url=https://httpbin.org/get&proxy_params={\\"disableRetry\\":true}" \\
  -H "scrapedo-key: your_scrapedo_key"`,

            python: `import requests
import json

url = "http://15.235.85.189:9090/fetch"

params = {
    "url": "https://httpbin.org/get",
    "proxy_params": json.dumps({
        "disableRetry": "true"
    }),
}

headers = {
    "scrapedo-key": "your_scrapedo_key"
}

response = requests.get(url, params=params, headers=headers)

print(response.status_code)
print(response.text)`
        },

        parameters: {
            url: "https://httpbin.org/get",
            proxy_params: {
                disableRetry: true
            }
        },

        method: "GET"
    }, {
        section: 13,
        title: "Block Resources",
        description: "Control resource loading during JavaScript rendering",

        additionalDescription:
            "This example configures whether additional page resources such as images, fonts, and stylesheets should be blocked during rendering.",

        note:
            "Blocking unnecessary resources can significantly improve rendering speed and reduce bandwidth usage.",

        examples: {
            curl: `curl "15.235.85.189:9090/fetch?url=https://httpbin.org/get&proxy_params={\\"render\\":true,\\"blockResources\\":false}" \\
  -H "scrapedo-key: your_scrapedo_key"`,

            python: `import requests
import json

url = "http://15.235.85.189:9090/fetch"

params = {
    "url": "https://httpbin.org/get",
    "proxy_params": json.dumps({
        "render": True,
        "blockResources": False
    })
}

headers = {
    "scrapedo-key": "your_scrapedo_key"
}

response = requests.get(url, params=params, headers=headers)

print(response.status_code)`
        },

        parameters: {
            url: "https://httpbin.org/get",
            proxy_params: {
                render: true,
                blockResources: false
            }
        },

        method: "GET"
    }, {
        section: 14,
        title: "Screenshot",
        description: "Capture a screenshot of the rendered webpage",

        additionalDescription:
            "This example enables JavaScript rendering and returns a screenshot of the fully loaded page in the JSON response.",

        note:
            "When screenShot and returnJSON are enabled, the response may contain base64 encoded screenshot data.",

        examples: {
            curl: `curl "15.235.85.189:9090/fetch?url=https://httpbin.org/get&proxy_params={\\"render\\":true,\\"returnJSON\\":true,\\"screenShot\\":true}" \\
  -H "scrapedo-key: your_scrapedo_key"`,

            python: `import requests
import json
import base64

url = "http://15.235.85.189:9090/fetch"

params = {
    "url": "https://httpbin.org/get",
    "proxy_params": json.dumps({
        "render": True,
        "returnJSON": True,
        "screenShot": True
    })
}

headers = {
    "scrapedo-key": "your_scrapedo_key"
}

response = requests.get(url, params=params, headers=headers)

print(response.status_code)`
        },

        parameters: {
            url: "https://httpbin.org/get",
            proxy_params: {
                render: true,
                returnJSON: true,
                screenShot: true
            }
        },

        method: "GET"
    }, {
        section: 15,
        title: "Full Screenshot",
        description: "Capture a full-page screenshot of the rendered webpage",

        additionalDescription:
            "This example captures the entire webpage from top to bottom after JavaScript rendering is completed.",

        note:
            "Full page screenshots may increase rendering time and response size for long webpages.",

        examples: {
            curl: `curl "15.235.85.189:9090/fetch?url=https://httpbin.org/get&proxy_params={\\"render\\":true,\\"returnJSON\\":true,\\"fullScreenShot\\":true}" \\
  -H "scrapedo-key: your_scrapedo_key"`,

            python: `import requests
import json
import base64

url = "http://15.235.85.189:9090/fetch"

params = {
    "url": "https://httpbin.org/get",
    "proxy_params": json.dumps({
        "render": True,
        "returnJSON": True,
        "fullScreenShot": True
    })
}

headers = {
    "scrapedo-key": "your_scrapedo_key"
}

response = requests.get(url, params=params, headers=headers)

print(response.status_code)`
        },

        parameters: {
            url: "https://httpbin.org/get",
            proxy_params: {
                render: true,
                returnJSON: true,
                fullScreenShot: true
            }
        },

        method: "GET"
    }, {
        section: 16,
        title: "Partial Screenshot",
        description: "Capture a screenshot of a specific page element",

        additionalDescription:
            "This example captures a screenshot of a specific DOM element using a CSS selector after the page is rendered.",

        note:
            "The particularScreenShot value should be a valid CSS selector such as body, #main, or .container.",

        examples: {
            curl: `curl "15.235.85.189:9090/fetch?url=https://httpbin.org/get&proxy_params={\\"render\\":true,\\"returnJSON\\":true,\\"particularScreenShot\\":\\"body\\"}" \\
  -H "scrapedo-key: your_scrapedo_key"`,

            python: `import requests
import json
import base64

url = "http://15.235.85.189:9090/fetch"

params = {
    "url": "https://httpbin.org/get",
    "proxy_params": json.dumps({
        "render": True,
        "returnJSON": True,
        "particularScreenShot": "body"
    })
}

headers = {
    "scrapedo-key": "your_scrapedo_key"
}

response = requests.get(url, params=params, headers=headers)

print(response.status_code)`
        },

        parameters: {
            url: "https://httpbin.org/get",
            proxy_params: {
                render: true,
                returnJSON: true,
                particularScreenShot: "body"
            }
        },

        method: "GET"
    }, {
        section: 17,
        title: "Show Websocket Requests",
        description: "Capture websocket requests during page rendering",

        additionalDescription:
            "This example enables tracking of websocket connections and messages generated while rendering the webpage.",

        note:
            "Useful for debugging real-time applications that rely on websocket communication.",

        examples: {
            curl: `curl "15.235.85.189:9090/fetch?url=https://httpbin.org/get&proxy_params={\\"render\\":true,\\"returnJSON\\":true,\\"showWebsocketRequests\\":true}" \\
  -H "scrapedo-key: your_scrapedo_key"`,

            python: `import requests
import json
import base64

url = "http://15.235.85.189:9090/fetch"

params = {
    "url": "https://httpbin.org/get",
    "proxy_params": json.dumps({
        "render": True,
        "returnJSON": True,
        "showWebsocketRequests": True
    })
}

headers = {
    "scrapedo-key": "your_scrapedo_key"
}

response = requests.get(url, params=params, headers=headers)

print(response.status_code)`
        },

        parameters: {
            url: "https://httpbin.org/get",
            proxy_params: {
                render: true,
                returnJSON: true,
                showWebsocketRequests: true
            }
        },

        method: "GET"
    }, {
        section: 18,
        title: "Show Frames",
        description: "Capture frame and iframe details during rendering",

        additionalDescription:
            "This example enables collection of frame information including nested iframes and embedded page structures.",

        note:
            "Useful when scraping websites that load content inside frames or embedded iframes.",

        examples: {
            curl: `curl "15.235.85.189:9090/fetch?url=https://httpbin.org/anything&proxy_params={\\"render\\":true,\\"returnJSON\\":true,\\"showFrames\\":true}" \\
  -H "scrapedo-key: your_scrapedo_key"`,

            python: `import requests
import json
import base64

url = "http://15.235.85.189:9090/fetch"

params = {
    "url": "https://httpbin.org/anything",
    "proxy_params": json.dumps({
        "render": True,
        "returnJSON": True,
        "showFrames": True
    })
}

headers = {
    "scrapedo-key": "your_scrapedo_key"
}

response = requests.get(url, params=params, headers=headers)

print(response.status_code)`
        },

        parameters: {
            url: "https://httpbin.org/anything",
            proxy_params: {
                render: true,
                returnJSON: true,
                showFrames: true
            }
        },

        method: "GET"
    }, {
        section: 19,
        title: "Pure Cookies",
        description: "Return only raw cookie data from the response",

        additionalDescription:
            "This example enables pure cookie extraction mode to simplify cookie handling from target responses.",

        note:
            "Useful when you only need cookie information without additional response processing.",

        examples: {
            curl: `curl "15.235.85.189:9090/fetch?url=https://httpbin.org/get&proxy_params={\\"pureCookies\\":true}" \\
  -H "scrapedo-key: your_scrapedo_key"`,

            python: `import requests
import json

url = "http://15.235.85.189:9090/fetch"

params = {
    "url": "https://httpbin.org/get",
    "proxy_params": json.dumps({
        "pureCookies": True
    })
}

headers = {
    "scrapedo-key": "your_scrapedo_key"
}

response = requests.get(url, params=params, headers=headers)

print(response.status_code)`
        },

        parameters: {
            url: "https://httpbin.org/get",
            proxy_params: {
                pureCookies: true
            }
        },

        method: "GET"
    }, {
        section: 20,
        title: "Transparent Response",
        description: "Return the target website response with minimal modification",

        additionalDescription:
            "This example enables transparent response mode to preserve original response headers and structure as closely as possible.",

        note:
            "Useful for debugging APIs or when exact upstream response behavior is required.",

        examples: {
            curl: `curl "15.235.85.189:9090/fetch?url=https://httpbin.org/get&proxy_params={\\"transparentResponse\\":true}" \\
  -H "scrapedo-key: your_scrapedo_key"`,

            python: `import requests
import json

url = "http://15.235.85.189:9090/fetch"

params = {
    "url": "https://httpbin.org/get",
    "proxy_params": json.dumps({
        "transparentResponse": True
    })
}

headers = {
    "scrapedo-key": "your_scrapedo_key"
}

response = requests.get(url, params=params, headers=headers)

print(response.status_code)`
        },

        parameters: {
            url: "https://httpbin.org/get",
            proxy_params: {
                transparentResponse: true
            }
        },

        method: "GET"
    }, {
        section: 21,
        title: "Output",
        description: "Control the response output format",

        additionalDescription:
            "This example returns the rendered webpage content in markdown format instead of raw HTML.",

        note:
            "Supported output formats may vary depending on rendering configuration and response type.",

        examples: {
            curl: `curl "15.235.85.189:9090/fetch?url=https://httpbin.org/get&proxy_params={\\"output\\":\\"markdown\\",\\"render\\":true}" \\
  -H "scrapedo-key: your_scrapedo_key"`,

            python: `import requests
import json

url = "http://15.235.85.189:9090/fetch"

params = {
    "url": "https://httpbin.org/get",
    "proxy_params": json.dumps({
        "output": "markdown",
        "render": True
    })
}

headers = {
    "scrapedo-key": "your_scrapedo_key"
}

response = requests.get(url, params=params, headers=headers)

print(response.status_code)`
        },

        parameters: {
            url: "https://httpbin.org/get",
            proxy_params: {
                output: "markdown",
                render: true
            }
        },

        method: "GET"
    }, {
        section: 22,
        title: "Height & Width",
        description: "Configure custom browser viewport dimensions",

        additionalDescription:
            "This example sets a custom browser viewport width and height for rendering webpages and screenshots.",

        note:
            "Viewport dimensions can affect responsive layouts, rendering behavior, and screenshot appearance.",

        examples: {
            curl: `curl "15.235.85.189:9090/fetch?url=https://httpbin.org/get&proxy_params={\\"render\\":true,\\"height\\":1080,\\"width\\":1920}" \\
  -H "scrapedo-key: your_scrapedo_key"`,

            python: `import requests
import json

url = "http://15.235.85.189:9090/fetch"

params = {
    "url": "https://httpbin.org/get",
    "proxy_params": json.dumps({
        "render": True,
        "height": 1080,
        "width": 1920
    })
}

headers = {
    "scrapedo-key": "your_scrapedo_key"
}

response = requests.get(url, params=params, headers=headers)

print(response.status_code)`
        },

        parameters: {
            url: "https://httpbin.org/get",
            proxy_params: {
                render: true,
                height: 1080,
                width: 1920
            }
        },

        method: "GET"
    }, {
        section: 23,
        title: "Timeout",
        description: "Set a custom request timeout duration",

        additionalDescription:
            "This example configures the maximum request processing time before the request is terminated.",

        note:
            "Timeout values are typically specified in milliseconds.",

        examples: {
            python: `import requests
import json

url = "http://15.235.85.189:9090/fetch"

params = {
    "url": "https://httpbin.co/sse?delay=1s",
    "proxy_params": json.dumps({
        "timeout": 10000
    })
}

headers = {
    "scrapedo-key": "your_scrapedo_key"
}

response = requests.get(url, params=params, headers=headers)

print(response.status_code)`
        },

        parameters: {
            url: "https://httpbin.co/sse?delay=1s",
            proxy_params: {
                timeout: 10000
            }
        },

        method: "GET"
    }, {
        section: 24,
        title: "Retry Timeout",
        description: "Configure the retry timeout duration for failed requests",

        additionalDescription:
            "This example sets the maximum time allowed between retry attempts when automatic retries are enabled.",

        note:
            "Retry timeout values are specified in milliseconds.",

        examples: {
            curl: `curl "15.235.85.189:9090/fetch?url=https://httpbin.co/anything&proxy_params={\\"retryTimeout\\":15000}" \\
  -H "scrapedo-key: your_scrapedo_key"`,

            python: `import requests
import json

url = "http://15.235.85.189:9090/fetch"

params = {
    "url": "https://httpbin.co/anything",
    "proxy_params": json.dumps({
        "retryTimeout": 15000
    })
}

headers = {
    "scrapedo-key": "your_scrapedo_key"
}

response = requests.get(url, params=params, headers=headers)

print(response.status_code)`
        },

        parameters: {
            url: "https://httpbin.co/anything",
            proxy_params: {
                retryTimeout: 15000
            }
        },

        method: "GET"
    }, {
        section: 25,
        title: "Device",
        description: "Simulate requests from different device types",

        additionalDescription:
            "This example configures the browser profile and user agent to emulate a desktop device.",

        note:
            "Supported device values may include desktop, mobile, and tablet.",

        examples: {
            curl: `curl "15.235.85.189:9090/fetch?url=https://httpbin.co/headers&proxy_params={\\"device\\":\\"desktop\\"}" \\
  -H "scrapedo-key: your_scrapedo_key"`,

            python: `import requests
import json

url = "http://15.235.85.189:9090/fetch"

params = {
    "url": "https://httpbin.co/headers",
    "proxy_params": json.dumps({
        "device": "desktop"
    })
}

headers = {
    "scrapedo-key": "your_scrapedo_key"
}

response = requests.get(url, params=params, headers=headers)

print(response.status_code)`
        },

        parameters: {
            url: "https://httpbin.co/headers",
            proxy_params: {
                device: "desktop"
            }
        },

        method: "GET"
    }, {
        section: 26,
        title: "Wait Until",
        description: "Control when page rendering is considered complete",

        additionalDescription:
            "This example waits until the DOMContentLoaded event is triggered before returning the response.",

        note:
            "Common waitUntil values include load, domcontentloaded, and networkidle.",

        examples: {
            curl: `curl "15.235.85.189:9090/fetch?url=https://httpbin.co/headers&proxy_params={\\"render\\":true,\\"waitUntil\\":\\"domcontentloaded\\"}" \\
  -H "scrapedo-key: your_scrapedo_key"`,

            python: `import requests
import json

url = "http://15.235.85.189:9090/fetch"

params = {
    "url": "https://httpbin.co/headers",
    "proxy_params": json.dumps({
        "render": True,
        "waitUntil": "domcontentloaded"
    })
}

headers = {
    "scrapedo-key": "your_scrapedo_key"
}

response = requests.get(url, params=params, headers=headers)

print(response.status_code)`
        },

        parameters: {
            url: "https://httpbin.co/headers",
            proxy_params: {
                render: true,
                waitUntil: "domcontentloaded"
            }
        },

        method: "GET"
    }, {
        section: 27,
        title: "Custom Wait",
        description: "Add a custom delay after page rendering",

        additionalDescription:
            "This example adds an additional delay before returning the rendered response to allow dynamic content to load completely.",

        note:
            "customWait values are specified in milliseconds.",

        examples: {
            curl: `curl "15.235.85.189:9090/fetch?url=https://httpbin.co/anything&proxy_params={\\"render\\":true,\\"customWait\\":1000}" \\
  -H "scrapedo-key: your_scrapedo_key"`,

            python: `import requests
import json

url = "http://15.235.85.189:9090/fetch"

params = {
    "url": "https://httpbin.co/anything",
    "proxy_params": json.dumps({
        "render": True,
        "customWait": 1000
    })
}

headers = {
    "scrapedo-key": "your_scrapedo_key"
}

response = requests.get(url, params=params, headers=headers)

print(response.status_code)`
        },

        parameters: {
            url: "https://httpbin.co/anything",
            proxy_params: {
                render: true,
                customWait: 1000
            }
        },

        method: "GET"
    }, {
        section: 28,
        title: "Wait Selector",
        description: "Wait for a specific DOM element before returning the response",

        additionalDescription:
            "This example waits until a specific CSS selector appears on the page before completing rendering.",

        note:
            "waitSelector should contain a valid CSS selector such as .class_name or #elementId.",

        examples: {
            curl: `curl "15.235.85.189:9090/fetch?url=https://httpbin.co/anything&proxy_params={\\"render\\":true,\\"waitSelector\\":\\".class_name\\"}" \\
  -H "scrapedo-key: your_scrapedo_key"`,

            python: `import requests
import json

url = "http://15.235.85.189:9090/fetch"

params = {
    "url": "https://httpbin.co/anything",
    "proxy_params": json.dumps({
        "render": True,
        "waitSelector": ".class_name"
    })
}

headers = {
    "scrapedo-key": "your_scrapedo_key"
}

response = requests.get(url, params=params, headers=headers)

print(response.status_code)`
        },

        parameters: {
            url: "https://httpbin.co/anything",
            proxy_params: {
                render: true,
                waitSelector: ".class_name"
            }
        },

        method: "GET"
    }, {
        section: 29,
        title: "Request with Extra Headers",
        description: "Attach additional headers without replacing default headers",

        additionalDescription:
            "This example appends custom headers to the outgoing request while preserving the default browser headers.",

        note:
            "extraHeaders is useful when you need to send custom metadata alongside standard request headers.",

        examples: {
            curl: `curl "15.235.85.189:9090/fetch?url=https://httpbin.org/headers&headers={\\"sd-Test\\":\\"testValue\\"}&proxy_params={\\"extraHeaders\\":true}" \\
  -H "scrapedo-key: your_scrapedo_key"`,

            python: `import requests
import json

url = "http://15.235.85.189:9090/fetch"

params = {
    "url": "https://httpbin.org/headers",
    "headers": json.dumps({
        "sd-Test": "testValue"
    }),
    "proxy_params": json.dumps({
        "extraHeaders": True
    })
}

headers = {
    "scrapedo-key": "your_scrapedo_key"
}

response = requests.get(url, params=params, headers=headers)

print(response.status_code)`
        },

        parameters: {
            url: "https://httpbin.org/headers",
            headers: {
                "sd-Test": "testValue"
            },
            proxy_params: {
                extraHeaders: true
            }
        },

        method: "GET"
    }, {
        section: 30,
        title: "Request with Forward Headers",
        description: "Forward custom headers directly to the target server",

        additionalDescription:
            "This example forwards the specified headers exactly as provided in the outgoing request.",

        note:
            "forwardHeaders allows explicit control over which headers are sent to the destination website.",

        examples: {
            curl: `curl "15.235.85.189:9090/fetch?url=https://httpbin.org/headers&headers={\\"Test-Header-Key\\":\\"testValue\\"}&proxy_params={\\"forwardHeaders\\":true}" \\
  -H "scrapedo-key: your_scrapedo_key"`,

            python: `import requests
import json

url = "http://15.235.85.189:9090/fetch"

params = {
    "url": "https://httpbin.org/headers",
    "headers": json.dumps({
        "Test-Header-Key": "TestValue"
    }),
    "proxy_params": json.dumps({
        "forwardHeaders": True
    })
}

headers = {
    "scrapedo-key": "your_scrapedo_key"
}

response = requests.get(url, params=params, headers=headers)

print(response.status_code)`
        },

        parameters: {
            url: "https://httpbin.org/headers",
            headers: {
                "Test-Header-Key": "TestValue"
            },
            proxy_params: {
                forwardHeaders: true
            }
        },

        method: "GET"
    }, {
        section: 31,
        title: "Advanced Example",
        description: "Combine multiple proxy and request configuration options together",

        additionalDescription:
            "This example demonstrates a complex POST request using payloads, custom headers, geo targeting, premium proxies, and custom header forwarding together.",

        note:
            "Advanced configurations may increase request processing time and proxy credit usage.",

        examples: {
            curl: `curl "15.235.85.189:9090/fetch?url=https://httpbin.org/post&method=POST&payload={\\"data\\":\\"test\\"}&headers={\\"User-Agent\\":\\"Mozilla\\"}&proxy_params={\\"geoCode\\":\\"us\\",\\"super\\":true,\\"customHeaders\\":true}" \\
  -H "scrapedo-key: your_scrapedo_key"`,

            python: `import requests
import json

url = "http://15.235.85.189:9090/fetch"

params = {
    "url": "https://httpbin.org/post",
    "method": "POST",
    "payload": json.dumps({
        "data": "test"
    }),
    "headers": json.dumps({
        "User-Agent": "Mozilla/5.0"
    }),
    "proxy_params": json.dumps({
        "geoCode": "us",
        "super": True,
        "customHeaders": True
    })
}

headers = {
    "scrapedo-key": "your_scrapedo_key"
}

response = requests.get(url, params=params, headers=headers)

print(response.status_code)
print(response.text)`
        },

        parameters: {
            url: "https://httpbin.org/post",
            method: "POST",
            payload: {
                data: "test"
            },
            headers: {
                "User-Agent": "Mozilla/5.0"
            },
            proxy_params: {
                geoCode: "us",
                super: true,
                customHeaders: true
            }
        },

        method: "POST"
    }
];

export default docsData;