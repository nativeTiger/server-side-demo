# React Table with Server-Side Pagination, Search, and Sorting using TanStack

This repository contains a full-stack React application demonstrating how to implement server-side pagination, search, and sorting in a table component using TanStack's `react-table` for table management, `react-query` for fetching data, and `react-router` for routing. The server-side data management is handled by `json-server-faker-js`, a lightweight JSON server with fake data generation.

## Description

The client-side React application communicates with the server-side JSON server to fetch, search, and sort data. It provides a responsive user interface with a table component powered by `react-table` that supports server-side pagination, search, and sorting.

### Features

- **Server-side pagination**: Fetch data from the server in smaller chunks to efficiently handle large datasets.
- **Server-side search**: Send search queries to the server and retrieve matching results.
- **Server-side sorting**: Allow users to sort table data on the server, reducing client-side processing.
- **Responsive UI**: User-friendly interface that adapts to various screen sizes.
- **Error handling**: Gracefully handle errors and display meaningful error messages to users.
- **Loading indicators**: Provide visual feedback to users while data is being fetched from the server.

## Getting Started

To run the application locally, follow these steps:

### Client

```bash
cd client
npm install
npm run dev
```

### Json Server

```bash
cd json-server-faker-js
npm install
npm run dev
```
