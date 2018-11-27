# Serverless Link Station API

[Serverless](https://serverless.com) API to calculate most suitable link station for a device at given point `x,y`.

## Development

Install dependency `serverless`:

```bash
$ yarn install
```

Invoke index handler locally:

```bash
$ yarn run invoke-local
```

Which should result in:

```bash
{
    "statusCode": 200,
    "body": "{\"message\":\"Best link station for point 5,0 is 10,0 with power 49\",\"point\":[5,0],\"station\":[10,0,12,5,49]}"
}
```

`data.json` contains sample query parameters for local/remote invocation:

```json
{
  "queryStringParameters": {
    "x": 5,
    "y": 0
  }
}
```

## Deploy

Make sure you have the necessary AWS credentials and IAM policy set up for [Serverless](https://serverless.com) by following [this guide](https://serverless.com/framework/docs/providers/aws/guide/credentials/).

In order to deploy the service run:

```bash
$ yarn run deploy
```

Which should result in something like this:

```bash
Serverless: Packaging service...
Serverless: Excluding development dependencies...
Serverless: Creating Stack...
Serverless: Checking Stack create progress...
.....
Serverless: Stack create finished...
Serverless: Uploading CloudFormation file to S3...
Serverless: Uploading artifacts...
Serverless: Uploading service .zip file to S3 (68.81 KB)...
Serverless: Validating template...
Serverless: Updating Stack...
Serverless: Checking Stack update progress...
.............................
Serverless: Stack update finished...
Service Information
service: serverless-stations
stage: dev
region: eu-central-1
stack: serverless-stations-dev
api keys:
  None
endpoints:
  GET - https://XXXXXXX.execute-api.eu-central-1.amazonaws.com/dev/
functions:
  index: serverless-stations-dev-index
```

You can now invoke the Lambda directly:

```bash
$ yarn run invoke
```

or send an HTTP request directly to the endpoint using `curl`:

```bash
$ curl https://XXXXXXX.execute-api.eu-central-1.amazonaws.com/dev/?x=5&y=5
```

## API documentation

**Index**

Calculate most suitable link station for a device at given point `x,y`.

- **URL**

  /

- **Method:**

  `GET`

- **URL Params**

  **Required:**

  `x=[integer] y=[integer]`

- **Success Response:**

  - **Code:** 200 <br />
    **Content:** `{"message":"Best link station for point 5,0 is 10,0 with power 49","point":["5","0"],"station":[10,0,12,5,49]}`

- **Error Response:**

  - **Code:** 400 Bad request <br />
    **Content:** `{"error":"Query parameters x,y missing or invalid"}`

- **Sample Call:**

  ```bash
  $ curl https://XXXXXXX.execute-api.eu-central-1.amazonaws.com/dev/?x=5&y=5
  ```
