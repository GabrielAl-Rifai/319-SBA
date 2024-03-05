# Boulder & Lead Climbs API

This API allows users to manage boulder and lead route climbing information, including adding, updating, and deleting climbs, as well as rating their difficulty.

## Installation

1. Clone this repository:
   git clone https://github.com/GabrielAl-Rifai/318-SBA.git

2. Navigate to the project directory:
   cd your-repository

3. Install dependencies:
   npm install

4. Start the server:
   node server.js

## Indexing

boulderSchema.index({ name: 1 });
boulderSchema.index({ difficulty: 1 });
boulderSchema.index({ accesibility: 1 });

## Example

## Response

## Middleware and Error Handling

Body Parser: Middleware for parsing incoming request bodies.
Error Handling: Error handling middleware is implemented in the server.js file.
difficulty: { message: "The difficulty must be greater than 10.5.",

```bash

```

boulderSchema.index({ name: 1 });
boulderSchema.index({ difficulty: 1 });
boulderSchema.index({ accesibility: 1 });
difficulty: { message: "The difficulty must be greater than 10.5.",
