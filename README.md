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

## Usage

GET /api/climbers: Retrieve information about climbers.
POST /api/climbers: Add a new climbers.
PATCH /api/climbers: Add or update a rating for a climbers.
DELETE /api/climbers: Delete a single climber.
GET /api/boulders: Retrieve information about boulders.
POST /api/boulders: Add a boulder.
PATCH /api/boulder: Add or update a rating for a boulder.
DELETE /api/boulder: Delete a single boulder.
GET /api/leadRoute: Retrieve information about leadRoutes.  
POST /api/leadRoute: Add a leadRoute.
PATCH /api/leadRoute: Add or update a rating for a leadRoute.
DELETE /api/leadRoute: Delete a single leadRoute.

## Validation

Buolder difficulty equal or greater to 10.5
Message Response: "The difficulty must be greater than 10.5."

## Example

## Response

## Middleware and Error Handling

Body Parser: Middleware for parsing incoming request bodies.
Error Handling: Error handling middleware is implemented in the server.js file.
difficulty: { message: "The difficulty must be greater than 10.5.",

```bash

```
