# Microservices architecture — Node, Express, MySQL & Docker

## Overview
This project implements a microservices architecture using Docker, Express, and MySQL, orchestrated through Docker Compose. It consists of an Nginx load balancer, an API Gateway handling centralized authentication (JWT), rate limiting, and request routing, and four independent microservices (Users, Orders, Payments, Catalogs), each with its own dedicated MySQL database to ensure loose coupling. Redis is used as a caching layer to improve gateway performance, RabbitMQ enables asynchronous communication between services (notably Orders and Payments), and a circuit breaker pattern (via Opossum) protects the system from cascading failures. The architecture is designed to be scalable, fault-tolerant, and production-ready, following separation of concerns and service independence principles.

![Architecture diagram](./arch-diagram.png)

## Tech stack

**Backend:** Node.js with Express for the API Gateway and each microservice.

**Database:** MySQL, one instance per service (Users, Orders, Payments, Catalogs), so each service owns its own data and schema.

**Cache:** Redis, used at the gateway level to reduce load on the services and speed up repeated requests.

**Messaging:** RabbitMQ, for async communication between Orders and Payments, so they don't call each other directly.

**Resilience:** Opossum for circuit breaking on the calls the gateway makes to the services, to stop failures from cascading.

**Load balancing / routing:** Nginx in front, API Gateway behind it handling JWT auth, rate limiting, and proxying requests to the right service.

**Infrastructure:** Docker and Docker Compose to run and connect all the services locally.
