// Import the supertest library for making HTTP requests
import supertest from "supertest";

// Import the Express application
import app from "../../src/app";

// Import databaseClient
import databaseClient from "../../database/client";

import type { Result, Rows } from "../../database/client";

// Restore all mocked functions after each test
afterEach(() => {
  jest.restoreAllMocks();
});

// Test suite for the GET /api/shelters route

describe("GET /api/shelters", () => {
  it("should fetch all shelters successfully", async () => {
    // Mock empty rows returned from the database
    const rows = [] as Rows;

    // Mock the implementation of the database query method
    jest
      .spyOn(databaseClient, "query")
      .mockImplementation(async () => [rows, []]);

    // Send a GET request to the /api/items endpoint
    const response = await supertest(app).get("/api/shelters");

    // Assertions
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual(rows);
  });
});

// Test suite for the GET /api/shelters/:id route
describe("GET /api/shelters/:id", () => {
  it("should fetch a single item successfully", async () => {
    // Mock rows returned from the database
    const rows = [{}] as Rows;

    // Mock the implementation of the database query method
    jest
      .spyOn(databaseClient, "query")
      .mockImplementation(async () => [rows, []]);

    // Send a GET request to the /api/shelters/:id endpoint
    const response = await supertest(app).get("/api/shelters/1");

    // Assertions
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual(rows[0]);
  });

  it("should fail on invalid id", async () => {
    // Mock empty rows returned from the database
    const rows = [] as Rows;

    // Mock the implementation of the database query method
    jest
      .spyOn(databaseClient, "query")
      .mockImplementation(async () => [rows, []]);

    // Send a GET request to the /api/shelters/:id endpoint with an invalid ID
    const response = await supertest(app).get("/api/shelters/0");

    // Assertions
    expect(response.status).toBe(404);
    expect(response.body).toEqual({});
  });
});

// Test suite for the POST /api/shelters route
// Doesn't pass: maybe something to change in app config :/
describe("POST /api/shelters", () => {
  it("should add a new shelter successfully", async () => {
    // Mock result of the database query
    const result = { insertId: 1 } as Result;

    // Mock the implementation of the database query method
    jest
      .spyOn(databaseClient, "query")
      .mockImplementation(async () => [result, []]);

    // Fake item data
    const fakeShelter = {
      name: "nouveau shelter",
      address: "adress",
      capacity: 20,
    };

    // Send a POST request to the /api/shelters endpoint with a test item
    const response = await supertest(app)
      .post("/api/shelters")
      .send(fakeShelter);

    // Assertions
    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.insertId).toBe(result.insertId);
  });

  it("should fail on invalid request body", async () => {
    // Mock result of the database query
    const result = { insertId: 1 } as Result;

    // Mock the implementation of the database query method
    jest
      .spyOn(databaseClient, "query")
      .mockImplementation(async () => [result, []]);

    // Fake shelter data with missing user_id
    const fakeShelter = {
      name: "nouveau shelter",
      adress: "adress",
    };

    // Send a POST request to the /api/shelters endpoint with a test item
    const response = await supertest(app)
      .post("/api/shelters")
      .send(fakeShelter);

    // Assertions
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
  });
});
