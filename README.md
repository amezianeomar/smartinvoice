# SmartInvoice Pro (SI-PRO)

SmartInvoice Pro (SI-PRO) is a **web invoicing application** built as a **V1 PFE project** with a future goal of evolving into a real SaaS product.

This version is focused on demonstrating the skills learned during the two-year **DEVWFS** training, while keeping the project realistic, functional, and clean.

---

## Project Context

Many small and medium businesses still manage invoices manually or with scattered tools, which leads to:

- Data entry errors  
- Time loss  
- Poor client and invoice tracking  
- Lack of centralization  
- Unprofessional workflow  

SmartInvoice Pro aims to solve this by providing a modern web platform for:

- Managing clients  
- Creating invoices  
- Calculating totals automatically  
- Generating PDF invoices  
- Sending invoices by email  
- Tracking invoice history  
- Visualizing key indicators in a dashboard  

---

## V1 PFE Scope

This repository contains the **V1 PFE version** of SmartInvoice Pro.

### Included Features

- Secure user authentication  
- Client management (CRUD)  
- Invoice creation  
- Invoice line items  
- Automatic calculation of:
  - HT  
  - TVA  
  - TTC  
- PDF invoice generation  
- Invoice sending by email  
- Invoice history with filtering and search  
- Dashboard with key indicators and simple charts  

### Excluded Features

These are intentionally **not part of the V1 PFE scope**:

- Online payment  
- Subscription / membership system  
- Advanced roles and permissions  
- Mobile application  
- Advanced accounting integration  
- Advanced multi-currency support  
- AI / predictive analytics  
- Advanced stock management  

---

## Tech Stack

### Frontend
- React.js  
- Tailwind CSS  

### Backend
- Laravel (PHP)  
- REST API  

### Database
- MySQL  

### Tools
- Git / GitHub  
- Postman  

---

## Main Business Entities

The main data model of the project is based on:

- **Utilisateur**  
- **Client**  
- **Facture**  
- **LigneFacture**  

### Main Relationships

- One user manages many clients  
- One user manages many invoices  
- One client can have many invoices  
- One invoice contains one or more invoice line items  

---

## Core Functional Modules

### 1. Authentication
- Register  
- Login  
- Logout  
- Protected routes  

### 2. Client Management
- Add client  
- Edit client  
- Delete client  
- List clients  

### 3. Invoice Management
- Create invoice  
- Add multiple line items  
- Calculate totals automatically  
- Store invoices in database  

### 4. PDF Module
- Generate invoice PDF  
- Download PDF  

### 5. Email Module
- Send invoice PDF by email  

### 6. History and Filters
- List saved invoices  
- Filter/search invoices  

### 7. Dashboard
- Total invoices  
- Revenue indicators  
- Simple charts  
- Recent invoices  

---

## Folder Structure

```text
smartinvoice/
├── backend/    # Laravel backend (API, business logic, database access)
├── frontend/   # React frontend (UI, pages, components)
├── diagrams/   # UML and modeling diagrams
│   ├── class-diagram.png
│   ├── mld.png
│   ├── sequence-diagram.png
│   └── use-case.png
├── docs/       # Project documentation
│   ├── cdc-client.pdf
│   ├── cdc-technique.pdf
│   └── fiche-projet.pdf
```

---

## Purpose of Each Main Folder

### `/backend`
Contains the Laravel application:
- API routes  
- Controllers  
- Models  
- Services  
- Validation  
- PDF generation  
- Email sending  
- Database migrations  

### `/frontend`
Contains the React application:
- Pages  
- Layouts  
- Forms  
- Tables  
- Dashboard UI  
- Invoice screens  
- API integration  

### `/diagrams`
Contains the main diagrams used for project analysis and design:
- Use Case Diagram  
- Class Diagram  
- MLD  
- Sequence Diagram  

### `/docs`
Contains the official project documentation:
- Fiche projet  
- CDC client  
- CDC technique  

---

## Planned Development Workflow

The project is developed using a small-team **Scrum-inspired workflow**.

### Main Steps

1. Define scope and documentation  
2. Prepare UML diagrams and MLD  
3. Design database schema and API  
4. Build backend and frontend modules  
5. Test and integrate  
6. Deploy and prepare jury presentation  

---

## Development Priorities

The implementation order should follow this logic:

1. Project setup  
2. Database schema  
3. Authentication  
4. Client CRUD  
5. Invoice CRUD + line items  
6. PDF generation  
7. Email sending  
8. History and filters  
9. Dashboard  
10. Deployment  

---

## Delivery Objective

The goal of the V1 PFE version is to deliver:

- A functional and demonstrable web application  
- A clean technical architecture  
- A realistic invoicing workflow  
- A solid foundation for future SaaS evolution  

---

## Future SaaS Evolution

After the PFE delivery, SmartInvoice Pro may evolve into a more advanced SaaS product with features such as:

- Subscription plans  
- Online payment  
- Advanced roles and permissions  
- Additional business features  
- Stronger analytics  
- Scalability improvements  

---

## Notes for AI / IDE Agents

This project should always be interpreted with the following constraints:

- This is the **V1 PFE version**, not the final SaaS version  
- The project uses **MySQL only**  
- Email sending is included  
- Dashboard charts are included but should remain simple  
- Do not add out-of-scope features unless explicitly requested  
- Respect the existing documentation in `/docs`  
- Respect the diagrams in `/diagrams`  
- Keep implementation aligned with:
  - CDC Client  
  - CDC Technique  
  - Fiche Projet  
  - MLD  
  - UML diagrams  

---

## Naming Convention Reminder

Use consistent naming aligned with the project documents:

- `users`  
- `clients`  
- `invoices`  
- `invoice_items`  

Conceptually:

- Utilisateur  
- Client  
- Facture  
- LigneFacture  

---

## Project Status

Current status:

- Documentation prepared  
- UML diagrams prepared  
- MLD prepared  
- Ready for implementation planning and development  

---

**SmartInvoice Pro (SI-PRO) - V1 PFE**  
*A clean invoicing platform first, a future SaaS later.*
