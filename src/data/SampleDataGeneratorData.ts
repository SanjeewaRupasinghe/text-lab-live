import { faker } from "@faker-js/faker";

export type DataType =
  | "user"
  | "customer"
  | "employee"
  | "candidate"
  | "student"
  | "medical"
  | "admin"
  | "supplier"
  | "author"
  | "contact"
  | "product"
  | "book"
  | "device"
  | "service"
  | "course"
  | "vehicle"
  | "part"
  | "order"
  | "invoice"
  | "payment"
  | "quote"
  | "cart"
  | "shipment"
  | "return"
  | "subscription"
  | "article"
  | "document"
  | "image"
  | "video"
  | "report"
  | "template"
  | "event"
  | "reservation"
  | "task"
  | "activity"
  | "notification"
  | "address"
  | "geography"
  | "office"
  | "venue"
  | "geopoint"
  | "company"
  | "department"
  | "branch"
  | "group"
  | "network"
  | "hierarchy"
  | "family"
  | "message"
  | "comment"
  | "ticket"
  | "log";

export interface DataTemplate {
  label: string;
  generator: () => any;
}

export const dataTemplates: Record<DataType, DataTemplate> = {
  user: {
    label: "User / Account / Profile",
    generator: () => ({
      id: faker.string.uuid(),
      username: faker.internet.username(),
      email: faker.internet.email(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      avatar: faker.image.avatar(),
      birthDate: faker.date.birthdate().toISOString().split("T")[0],
      registeredAt: faker.date.past().toISOString(),
      phone: faker.phone.number(),
      website: faker.internet.url(),
      bio: faker.person.bio(),
    }),
  },
  customer: {
    label: "Customer / Client / Lead / Prospect",
    generator: () => ({
      id: faker.string.uuid(),
      companyName: faker.company.name(),
      contactName: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      industry: faker.commerce.department(),
      revenue: faker.number.int({ min: 10000, max: 10000000 }),
      employees: faker.number.int({ min: 1, max: 10000 }),
      status: faker.helpers.arrayElement([
        "lead",
        "prospect",
        "client",
        "churned",
      ]),
      address: faker.location.streetAddress(),
      city: faker.location.city(),
      country: faker.location.country(),
      website: faker.internet.url(),
      notes: faker.lorem.sentence(),
    }),
  },
  employee: {
    label: "Employee / Staff",
    generator: () => ({
      id: faker.string.uuid(),
      employeeId: faker.string.alphanumeric(8).toUpperCase(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      department: faker.commerce.department(),
      position: faker.person.jobTitle(),
      salary: faker.number.int({ min: 30000, max: 150000 }),
      hireDate: faker.date.past({ years: 10 }).toISOString().split("T")[0],
      manager: faker.person.fullName(),
      status: faker.helpers.arrayElement(["active", "on-leave", "terminated"]),
      address: faker.location.streetAddress(),
      city: faker.location.city(),
    }),
  },
  candidate: {
    label: "Candidate / Applicant",
    generator: () => ({
      id: faker.string.uuid(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      position: faker.person.jobTitle(),
      experience: faker.number.int({ min: 0, max: 20 }),
      education: faker.helpers.arrayElement([
        "High School",
        "Bachelor's",
        "Master's",
        "PhD",
      ]),
      skills: faker.helpers.arrayElements(
        [
          "JavaScript",
          "Python",
          "Java",
          "React",
          "Node.js",
          "SQL",
          "AWS",
          "Docker",
        ],
        { min: 2, max: 5 }
      ),
      resumeUrl: faker.internet.url(),
      linkedIn: faker.internet.url(),
      status: faker.helpers.arrayElement([
        "applied",
        "screening",
        "interview",
        "offer",
        "rejected",
      ]),
      appliedDate: faker.date.recent({ days: 30 }).toISOString().split("T")[0],
      expectedSalary: faker.number.int({ min: 40000, max: 150000 }),
    }),
  },
  student: {
    label: "Student / Teacher / Instructor / Mentor",
    generator: () => ({
      id: faker.string.uuid(),
      studentId: faker.string.alphanumeric(10).toUpperCase(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      dateOfBirth: faker.date
        .birthdate({ min: 18, max: 65, mode: "age" })
        .toISOString()
        .split("T")[0],
      enrollmentDate: faker.date.past({ years: 5 }).toISOString().split("T")[0],
      major: faker.helpers.arrayElement([
        "Computer Science",
        "Business",
        "Engineering",
        "Medicine",
        "Arts",
        "Education",
      ]),
      gpa: faker.number.float({ min: 2.0, max: 4.0, fractionDigits: 2 }),
      year: faker.helpers.arrayElement([
        "Freshman",
        "Sophomore",
        "Junior",
        "Senior",
        "Graduate",
      ]),
      address: faker.location.streetAddress(),
      city: faker.location.city(),
      guardianName: faker.person.fullName(),
      guardianPhone: faker.phone.number(),
    }),
  },
  medical: {
    label: "Patient / Doctor / Nurse",
    generator: () => ({
      id: faker.string.uuid(),
      medicalId: faker.string.alphanumeric(12).toUpperCase(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      dateOfBirth: faker.date
        .birthdate({ min: 18, max: 85, mode: "age" })
        .toISOString()
        .split("T")[0],
      role: faker.helpers.arrayElement([
        "Patient",
        "Doctor",
        "Nurse",
        "Specialist",
        "Surgeon",
      ]),
      department: faker.helpers.arrayElement([
        "Cardiology",
        "Neurology",
        "Pediatrics",
        "Emergency",
        "Surgery",
        "Oncology",
      ]),
      bloodType: faker.helpers.arrayElement([
        "A+",
        "A-",
        "B+",
        "B-",
        "AB+",
        "AB-",
        "O+",
        "O-",
      ]),
      address: faker.location.streetAddress(),
      city: faker.location.city(),
      emergencyContact: faker.person.fullName(),
      emergencyPhone: faker.phone.number(),
      insuranceProvider: faker.company.name(),
      lastVisit: faker.date.recent({ days: 90 }).toISOString().split("T")[0],
    }),
  },
  admin: {
    label: "Admin / Moderator",
    generator: () => ({
      id: faker.string.uuid(),
      username: faker.internet.username(),
      email: faker.internet.email(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      role: faker.helpers.arrayElement([
        "Super Admin",
        "Admin",
        "Moderator",
        "Content Manager",
      ]),
      permissions: faker.helpers.arrayElements(
        [
          "read",
          "write",
          "delete",
          "manage_users",
          "manage_content",
          "view_analytics",
        ],
        { min: 2, max: 5 }
      ),
      status: faker.helpers.arrayElement(["active", "inactive", "suspended"]),
      lastLogin: faker.date.recent({ days: 7 }).toISOString(),
      createdAt: faker.date.past({ years: 3 }).toISOString(),
      twoFactorEnabled: faker.datatype.boolean(),
      phone: faker.phone.number(),
      department: faker.commerce.department(),
    }),
  },
  supplier: {
    label: "Supplier / Vendor / Partner",
    generator: () => ({
      id: faker.string.uuid(),
      companyName: faker.company.name(),
      contactPerson: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      category: faker.helpers.arrayElement([
        "Raw Materials",
        "Equipment",
        "Services",
        "Technology",
        "Logistics",
      ]),
      products: faker.helpers.arrayElements(
        ["Product A", "Product B", "Product C", "Product D", "Product E"],
        { min: 1, max: 3 }
      ),
      rating: faker.number.float({ min: 1, max: 5, fractionDigits: 1 }),
      since: faker.date.past({ years: 10 }).toISOString().split("T")[0],
      contractValue: faker.number.int({ min: 50000, max: 5000000 }),
      paymentTerms: faker.helpers.arrayElement([
        "Net 30",
        "Net 60",
        "Net 90",
        "Immediate",
      ]),
      address: faker.location.streetAddress(),
      city: faker.location.city(),
      country: faker.location.country(),
      website: faker.internet.url(),
    }),
  },
  author: {
    label: "Author / Publisher",
    generator: () => ({
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      penName: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      genre: faker.helpers.arrayElements(
        [
          "Fiction",
          "Non-Fiction",
          "Science Fiction",
          "Mystery",
          "Romance",
          "Biography",
        ],
        { min: 1, max: 3 }
      ),
      publishedBooks: faker.number.int({ min: 0, max: 50 }),
      publisher: faker.company.name(),
      website: faker.internet.url(),
      bio: faker.person.bio(),
      socialMedia: {
        twitter: `@${faker.internet.username()}`,
        instagram: `@${faker.internet.username()}`,
      },
      awards: faker.helpers.arrayElements(
        ["Bestseller", "Literary Prize", "Critics Choice", "Reader's Award"],
        { min: 0, max: 3 }
      ),
      activeYears: `${faker.date.past({ years: 20 }).getFullYear()}-Present`,
      royaltyRate: faker.number.float({ min: 5, max: 20, fractionDigits: 1 }),
    }),
  },
  contact: {
    label: "Contact / Emergency Contact",
    generator: () => ({
      id: faker.string.uuid(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      relationship: faker.helpers.arrayElement([
        "Spouse",
        "Parent",
        "Sibling",
        "Friend",
        "Child",
        "Relative",
        "Colleague",
      ]),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      alternatePhone: faker.phone.number(),
      address: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      zipCode: faker.location.zipCode(),
      country: faker.location.country(),
      isPrimary: faker.datatype.boolean(),
      notes: faker.lorem.sentence(),
      dateAdded: faker.date.past({ years: 2 }).toISOString().split("T")[0],
    }),
  },
  product: {
    label: "Product / Item / SKU",
    generator: () => ({
      id: faker.string.uuid(),
      sku: faker.string.alphanumeric(10).toUpperCase(),
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      category: faker.commerce.department(),
      price: parseFloat(faker.commerce.price({ min: 10, max: 1000 })),
      cost: parseFloat(faker.commerce.price({ min: 5, max: 500 })),
      stock: faker.number.int({ min: 0, max: 1000 }),
      weight: faker.number.float({ min: 0.1, max: 50, fractionDigits: 2 }),
      dimensions: {
        length: faker.number.float({ min: 1, max: 100, fractionDigits: 1 }),
        width: faker.number.float({ min: 1, max: 100, fractionDigits: 1 }),
        height: faker.number.float({ min: 1, max: 100, fractionDigits: 1 }),
      },
      manufacturer: faker.company.name(),
      barcode: faker.string.numeric(13),
      status: faker.helpers.arrayElement([
        "active",
        "discontinued",
        "out-of-stock",
        "coming-soon",
      ]),
      tags: faker.helpers.arrayElements(
        ["new", "sale", "featured", "bestseller", "limited"],
        { min: 1, max: 3 }
      ),
      rating: faker.number.float({ min: 1, max: 5, fractionDigits: 1 }),
      reviewCount: faker.number.int({ min: 0, max: 5000 }),
      createdAt: faker.date.past({ years: 2 }).toISOString().split("T")[0],
    }),
  },
  book: {
    label: "Book / E-book",
    generator: () => ({
      id: faker.string.uuid(),
      isbn: faker.string.numeric(13),
      title: faker.lorem.words({ min: 2, max: 5 }),
      author: faker.person.fullName(),
      publisher: faker.company.name(),
      publicationDate: faker.date
        .past({ years: 10 })
        .toISOString()
        .split("T")[0],
      genre: faker.helpers.arrayElements(
        [
          "Fiction",
          "Non-Fiction",
          "Science Fiction",
          "Mystery",
          "Romance",
          "Biography",
          "Self-Help",
        ],
        { min: 1, max: 2 }
      ),
      language: faker.helpers.arrayElement([
        "English",
        "Spanish",
        "French",
        "German",
        "Chinese",
        "Japanese",
      ]),
      pages: faker.number.int({ min: 100, max: 1000 }),
      format: faker.helpers.arrayElement([
        "Hardcover",
        "Paperback",
        "E-book",
        "Audiobook",
      ]),
      price: parseFloat(faker.commerce.price({ min: 5, max: 50 })),
      description: faker.lorem.paragraph(),
      rating: faker.number.float({ min: 1, max: 5, fractionDigits: 1 }),
      reviews: faker.number.int({ min: 0, max: 10000 }),
      stock: faker.number.int({ min: 0, max: 500 }),
      bestseller: faker.datatype.boolean(),
      series: faker.datatype.boolean() ? faker.lorem.words(2) : null,
      edition: faker.number.int({ min: 1, max: 5 }),
    }),
  },
  device: {
    label: "Device / Asset / Equipment",
    generator: () => ({
      id: faker.string.uuid(),
      assetTag: faker.string.alphanumeric(10).toUpperCase(),
      name: faker.commerce.productName(),
      type: faker.helpers.arrayElement([
        "Computer",
        "Laptop",
        "Tablet",
        "Phone",
        "Printer",
        "Server",
        "Router",
        "Monitor",
      ]),
      manufacturer: faker.company.name(),
      model: faker.string.alphanumeric(8).toUpperCase(),
      serialNumber: faker.string.alphanumeric(15).toUpperCase(),
      purchaseDate: faker.date.past({ years: 5 }).toISOString().split("T")[0],
      purchasePrice: faker.number.int({ min: 100, max: 5000 }),
      warrantyExpiry: faker.date
        .future({ years: 2 })
        .toISOString()
        .split("T")[0],
      status: faker.helpers.arrayElement([
        "active",
        "inactive",
        "maintenance",
        "retired",
        "lost",
      ]),
      assignedTo: faker.person.fullName(),
      department: faker.commerce.department(),
      location: faker.location.city(),
      condition: faker.helpers.arrayElement([
        "Excellent",
        "Good",
        "Fair",
        "Poor",
      ]),
      lastMaintenance: faker.date
        .recent({ days: 90 })
        .toISOString()
        .split("T")[0],
      notes: faker.lorem.sentence(),
      specifications: {
        processor: faker.helpers.arrayElement([
          "Intel i5",
          "Intel i7",
          "AMD Ryzen 5",
          "AMD Ryzen 7",
        ]),
        ram: faker.helpers.arrayElement(["8GB", "16GB", "32GB", "64GB"]),
        storage: faker.helpers.arrayElement([
          "256GB SSD",
          "512GB SSD",
          "1TB SSD",
          "2TB HDD",
        ]),
      },
    }),
  },
  service: {
    label: "Service / Subscription",
    generator: () => ({
      id: faker.string.uuid(),
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      category: faker.helpers.arrayElement([
        "Cloud Services",
        "Software",
        "Consulting",
        "Support",
        "Marketing",
        "Training",
        "Maintenance",
      ]),
      price: parseFloat(faker.commerce.price({ min: 9, max: 999 })),
      billingCycle: faker.helpers.arrayElement([
        "monthly",
        "quarterly",
        "yearly",
        "one-time",
      ]),
      status: faker.helpers.arrayElement([
        "active",
        "paused",
        "cancelled",
        "trial",
      ]),
      startDate: faker.date.past({ years: 2 }).toISOString().split("T")[0],
      renewalDate: faker.date.future({ years: 1 }).toISOString().split("T")[0],
      features: faker.helpers.arrayElements(
        [
          "24/7 Support",
          "API Access",
          "Custom Domain",
          "Analytics",
          "Team Collaboration",
          "Priority Support",
        ],
        { min: 2, max: 4 }
      ),
      maxUsers: faker.helpers.arrayElement([1, 5, 10, 25, 50, 100, -1]),
      storage: faker.helpers.arrayElement([
        "10GB",
        "50GB",
        "100GB",
        "500GB",
        "1TB",
        "Unlimited",
      ]),
      provider: faker.company.name(),
      customerName: faker.person.fullName(),
      customerEmail: faker.internet.email(),
      autoRenew: faker.datatype.boolean(),
      trialDays: faker.helpers.arrayElement([0, 7, 14, 30]),
    }),
  },
  course: {
    label: "Course / Module / Lesson",
    generator: () => ({
      id: faker.string.uuid(),
      courseCode: faker.string.alphanumeric(8).toUpperCase(),
      title: faker.lorem.words({ min: 3, max: 6 }),
      description: faker.lorem.paragraph(),
      instructor: faker.person.fullName(),
      category: faker.helpers.arrayElement([
        "Programming",
        "Business",
        "Design",
        "Marketing",
        "Data Science",
        "Language",
        "Personal Development",
      ]),
      level: faker.helpers.arrayElement([
        "Beginner",
        "Intermediate",
        "Advanced",
        "Expert",
      ]),
      duration: faker.number.int({ min: 1, max: 40 }),
      durationUnit: faker.helpers.arrayElement(["hours", "weeks", "months"]),
      price: parseFloat(faker.commerce.price({ min: 0, max: 499 })),
      students: faker.number.int({ min: 0, max: 50000 }),
      rating: faker.number.float({ min: 1, max: 5, fractionDigits: 1 }),
      reviews: faker.number.int({ min: 0, max: 10000 }),
      modules: faker.number.int({ min: 5, max: 30 }),
      lessons: faker.number.int({ min: 20, max: 200 }),
      language: faker.helpers.arrayElement([
        "English",
        "Spanish",
        "French",
        "German",
        "Chinese",
        "Japanese",
      ]),
      certificate: faker.datatype.boolean(),
      prerequisites: faker.helpers.arrayElements(
        [
          "Basic Programming",
          "Statistics",
          "No Prerequisites",
          "High School Math",
        ],
        { min: 0, max: 2 }
      ),
      skills: faker.helpers.arrayElements(
        [
          "React",
          "Python",
          "Marketing",
          "SEO",
          "Design Thinking",
          "SQL",
          "Machine Learning",
        ],
        { min: 2, max: 5 }
      ),
      lastUpdated: faker.date.recent({ days: 180 }).toISOString().split("T")[0],
      startDate: faker.date.future({ years: 1 }).toISOString().split("T")[0],
    }),
  },
  vehicle: {
    label: "Vehicle / Property / Room",
    generator: () => ({
      id: faker.string.uuid(),
      type: faker.helpers.arrayElement(["Vehicle", "Property", "Room"]),
      name: faker.helpers.arrayElement([
        faker.vehicle.vehicle(),
        `${faker.location.street()} ${faker.helpers.arrayElement([
          "House",
          "Apartment",
          "Condo",
        ])}`,
        `${faker.helpers.arrayElement([
          "Conference",
          "Meeting",
          "Office",
          "Hotel",
        ])} Room ${faker.number.int({ min: 100, max: 999 })}`,
      ]),
      identifier: faker.string.alphanumeric(12).toUpperCase(),
      status: faker.helpers.arrayElement([
        "available",
        "occupied",
        "maintenance",
        "reserved",
        "sold",
      ]),
      location: `${faker.location.city()}, ${faker.location.state()}`,
      price: faker.number.int({ min: 500, max: 500000 }),
      priceType: faker.helpers.arrayElement([
        "per day",
        "per month",
        "per year",
        "sale price",
      ]),
      capacity: faker.number.int({ min: 1, max: 500 }),
      features: faker.helpers.arrayElements(
        [
          "WiFi",
          "Parking",
          "Air Conditioning",
          "Pet Friendly",
          "Wheelchair Accessible",
          "Kitchen",
          "Pool",
        ],
        { min: 2, max: 5 }
      ),
      size: faker.number.int({ min: 100, max: 5000 }),
      sizeUnit: faker.helpers.arrayElement(["sq ft", "sq m", "seats"]),
      year: faker.date.past({ years: 20 }).getFullYear(),
      condition: faker.helpers.arrayElement([
        "Excellent",
        "Good",
        "Fair",
        "Needs Repair",
      ]),
      owner: faker.person.fullName(),
      ownerContact: faker.phone.number(),
      manager: faker.person.fullName(),
      availableFrom: faker.date
        .future({ years: 1 })
        .toISOString()
        .split("T")[0],
      lastInspection: faker.date
        .recent({ days: 180 })
        .toISOString()
        .split("T")[0],
      notes: faker.lorem.sentence(),
    }),
  },
  part: {
    label: "Part / Component",
    generator: () => ({
      id: faker.string.uuid(),
      partNumber: faker.string.alphanumeric(12).toUpperCase(),
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      category: faker.helpers.arrayElement([
        "Electronics",
        "Mechanical",
        "Hardware",
        "Software",
        "Accessory",
        "Tool",
      ]),
      manufacturer: faker.company.name(),
      supplier: faker.company.name(),
      price: parseFloat(faker.commerce.price({ min: 1, max: 500 })),
      cost: parseFloat(faker.commerce.price({ min: 0.5, max: 250 })),
      stock: faker.number.int({ min: 0, max: 10000 }),
      reorderLevel: faker.number.int({ min: 10, max: 100 }),
      location: faker.helpers.arrayElement([
        "Warehouse A",
        "Warehouse B",
        "Store Front",
        "Back Room",
      ]),
      bin: `${faker.string.alpha(1).toUpperCase()}${faker.number.int({
        min: 1,
        max: 99,
      })}-${faker.number.int({ min: 1, max: 20 })}`,
      weight: faker.number.float({ min: 0.01, max: 25, fractionDigits: 2 }),
      weightUnit: "kg",
      dimensions: {
        length: faker.number.float({ min: 0.5, max: 100, fractionDigits: 1 }),
        width: faker.number.float({ min: 0.5, max: 100, fractionDigits: 1 }),
        height: faker.number.float({ min: 0.5, max: 100, fractionDigits: 1 }),
        unit: "cm",
      },
      compatibleWith: faker.helpers.arrayElements(
        ["Model A", "Model B", "Model C", "Model D", "Universal"],
        { min: 1, max: 3 }
      ),
      warranty: faker.helpers.arrayElement([
        "30 days",
        "90 days",
        "1 year",
        "2 years",
        "Lifetime",
      ]),
      status: faker.helpers.arrayElement([
        "active",
        "discontinued",
        "obsolete",
        "on-order",
      ]),
      leadTime: faker.number.int({ min: 1, max: 90 }),
      upc: faker.string.numeric(12),
      lastOrdered: faker.date.recent({ days: 90 }).toISOString().split("T")[0],
      notes: faker.lorem.sentence(),
    }),
  },
  order: {
    label: "Order / Purchase",
    generator: () => ({
      id: faker.string.uuid(),
      orderNumber: faker.string.alphanumeric(10).toUpperCase(),
      customerName: faker.person.fullName(),
      customerEmail: faker.internet.email(),
      orderDate: faker.date.recent().toISOString(),
      status: faker.helpers.arrayElement([
        "pending",
        "processing",
        "shipped",
        "delivered",
        "cancelled",
        "refunded",
      ]),
      items: faker.helpers.arrayElements(
        [
          {
            name: faker.commerce.productName(),
            quantity: faker.number.int({ min: 1, max: 5 }),
            price: parseFloat(faker.commerce.price()),
          },
          {
            name: faker.commerce.productName(),
            quantity: faker.number.int({ min: 1, max: 5 }),
            price: parseFloat(faker.commerce.price()),
          },
        ],
        { min: 1, max: 5 }
      ),
      subtotal: parseFloat(faker.commerce.price({ min: 50, max: 2000 })),
      tax: parseFloat(faker.commerce.price({ min: 5, max: 200 })),
      shipping: parseFloat(faker.commerce.price({ min: 0, max: 50 })),
      total: parseFloat(faker.commerce.price({ min: 60, max: 2500 })),
      paymentMethod: faker.helpers.arrayElement([
        "Credit Card",
        "PayPal",
        "Bank Transfer",
        "Cash on Delivery",
      ]),
      shippingAddress: {
        street: faker.location.streetAddress(),
        city: faker.location.city(),
        state: faker.location.state(),
        zipCode: faker.location.zipCode(),
        country: faker.location.country(),
      },
      trackingNumber: faker.string.alphanumeric(16).toUpperCase(),
      estimatedDelivery: faker.date.soon().toISOString().split("T")[0],
      notes: faker.lorem.sentence(),
    }),
  },
  invoice: {
    label: "Invoice / Bill / Receipt",
    generator: () => ({
      id: faker.string.uuid(),
      invoiceNumber: `INV-${faker.string.alphanumeric(8).toUpperCase()}`,
      issueDate: faker.date.recent().toISOString().split("T")[0],
      dueDate: faker.date.soon().toISOString().split("T")[0],
      status: faker.helpers.arrayElement([
        "draft",
        "sent",
        "paid",
        "overdue",
        "cancelled",
      ]),
      customerName: faker.person.fullName(),
      customerEmail: faker.internet.email(),
      customerAddress: {
        street: faker.location.streetAddress(),
        city: faker.location.city(),
        zipCode: faker.location.zipCode(),
        country: faker.location.country(),
      },
      lineItems: faker.helpers.arrayElements(
        [
          {
            description: faker.commerce.productName(),
            quantity: faker.number.int({ min: 1, max: 10 }),
            unitPrice: parseFloat(faker.commerce.price()),
            amount: parseFloat(faker.commerce.price({ min: 50, max: 500 })),
          },
          {
            description: faker.commerce.productName(),
            quantity: faker.number.int({ min: 1, max: 10 }),
            unitPrice: parseFloat(faker.commerce.price()),
            amount: parseFloat(faker.commerce.price({ min: 50, max: 500 })),
          },
        ],
        { min: 1, max: 5 }
      ),
      subtotal: parseFloat(faker.commerce.price({ min: 100, max: 5000 })),
      taxRate: faker.number.float({ min: 0, max: 0.2, fractionDigits: 2 }),
      taxAmount: parseFloat(faker.commerce.price({ min: 10, max: 500 })),
      discount: parseFloat(faker.commerce.price({ min: 0, max: 200 })),
      total: parseFloat(faker.commerce.price({ min: 110, max: 5500 })),
      currency: faker.helpers.arrayElement(["USD", "EUR", "GBP", "CAD"]),
      paymentTerms: faker.helpers.arrayElement([
        "Net 30",
        "Net 60",
        "Due on Receipt",
        "Net 15",
      ]),
      notes: faker.lorem.sentence(),
      paidDate: faker.datatype.boolean()
        ? faker.date.recent().toISOString().split("T")[0]
        : null,
    }),
  },
  payment: {
    label: "Payment / Refund / Transaction",
    generator: () => ({
      id: faker.string.uuid(),
      transactionId: faker.string.alphanumeric(20).toUpperCase(),
      type: faker.helpers.arrayElement([
        "payment",
        "refund",
        "transfer",
        "withdrawal",
        "deposit",
      ]),
      status: faker.helpers.arrayElement([
        "pending",
        "completed",
        "failed",
        "cancelled",
        "processing",
      ]),
      amount: parseFloat(faker.commerce.price({ min: 10, max: 5000 })),
      currency: faker.helpers.arrayElement(["USD", "EUR", "GBP", "JPY", "CAD"]),
      paymentMethod: faker.helpers.arrayElement([
        "Credit Card",
        "Debit Card",
        "PayPal",
        "Bank Transfer",
        "Cryptocurrency",
        "Apple Pay",
        "Google Pay",
      ]),
      cardLastFour: faker.string.numeric(4),
      customerName: faker.person.fullName(),
      customerEmail: faker.internet.email(),
      merchantName: faker.company.name(),
      timestamp: faker.date.recent().toISOString(),
      description: faker.lorem.sentence(),
      fee: parseFloat(faker.commerce.price({ min: 0.5, max: 100 })),
      netAmount: parseFloat(faker.commerce.price({ min: 9, max: 4900 })),
      billingAddress: {
        street: faker.location.streetAddress(),
        city: faker.location.city(),
        state: faker.location.state(),
        zipCode: faker.location.zipCode(),
        country: faker.location.country(),
      },
      ipAddress: faker.internet.ip(),
      deviceType: faker.helpers.arrayElement(["mobile", "desktop", "tablet"]),
      receiptUrl: faker.internet.url(),
    }),
  },
  quote: {
    label: "Quote / Estimate",
    generator: () => ({
      id: faker.string.uuid(),
      quoteNumber: `QTE-${faker.string.alphanumeric(8).toUpperCase()}`,
      issueDate: faker.date.recent().toISOString().split("T")[0],
      expiryDate: faker.date.soon().toISOString().split("T")[0],
      status: faker.helpers.arrayElement([
        "draft",
        "sent",
        "accepted",
        "declined",
        "expired",
      ]),
      customerName: faker.person.fullName(),
      customerCompany: faker.company.name(),
      customerEmail: faker.internet.email(),
      customerPhone: faker.phone.number(),
      projectName: faker.lorem.words({ min: 2, max: 5 }),
      projectDescription: faker.lorem.paragraph(),
      lineItems: faker.helpers.arrayElements(
        [
          {
            description: faker.commerce.productName(),
            quantity: faker.number.int({ min: 1, max: 20 }),
            unitPrice: parseFloat(faker.commerce.price({ min: 50, max: 500 })),
            amount: parseFloat(faker.commerce.price({ min: 50, max: 1000 })),
          },
          {
            description: faker.commerce.productName(),
            quantity: faker.number.int({ min: 1, max: 20 }),
            unitPrice: parseFloat(faker.commerce.price({ min: 50, max: 500 })),
            amount: parseFloat(faker.commerce.price({ min: 50, max: 1000 })),
          },
        ],
        { min: 2, max: 6 }
      ),
      subtotal: parseFloat(faker.commerce.price({ min: 500, max: 10000 })),
      discountPercent: faker.number.int({ min: 0, max: 20 }),
      discountAmount: parseFloat(faker.commerce.price({ min: 0, max: 500 })),
      taxRate: faker.number.float({ min: 0, max: 0.2, fractionDigits: 2 }),
      taxAmount: parseFloat(faker.commerce.price({ min: 50, max: 1000 })),
      total: parseFloat(faker.commerce.price({ min: 550, max: 11000 })),
      currency: faker.helpers.arrayElement(["USD", "EUR", "GBP", "CAD"]),
      paymentTerms: faker.helpers.arrayElement([
        "50% upfront, 50% on completion",
        "Net 30",
        "Full payment upfront",
        "Milestone-based",
      ]),
      validityPeriod: `${faker.number.int({ min: 15, max: 90 })} days`,
      notes: faker.lorem.paragraph(),
      terms: faker.lorem.paragraph(),
      preparedBy: faker.person.fullName(),
    }),
  },
  cart: {
    label: "Cart / Wishlist",
    generator: () => ({
      id: faker.string.uuid(),
      cartId: faker.string.alphanumeric(12).toUpperCase(),
      type: faker.helpers.arrayElement(["cart", "wishlist"]),
      userId: faker.string.uuid(),
      userName: faker.person.fullName(),
      userEmail: faker.internet.email(),
      items: faker.helpers.arrayElements(
        [
          {
            productId: faker.string.uuid(),
            name: faker.commerce.productName(),
            sku: faker.string.alphanumeric(8).toUpperCase(),
            quantity: faker.number.int({ min: 1, max: 5 }),
            price: parseFloat(faker.commerce.price()),
            image: faker.image.url(),
          },
        ],
        { min: 1, max: 8 }
      ),
      subtotal: parseFloat(faker.commerce.price({ min: 50, max: 500 })),
      totalItems: faker.number.int({ min: 1, max: 20 }),
      createdAt: faker.date.past().toISOString(),
      updatedAt: faker.date.recent().toISOString(),
      expiresAt: faker.date.future().toISOString(),
      status: faker.helpers.arrayElement([
        "active",
        "abandoned",
        "converted",
        "expired",
      ]),
      couponCode: faker.datatype.boolean()
        ? faker.string.alphanumeric(8).toUpperCase()
        : null,
      discount: faker.datatype.boolean()
        ? parseFloat(faker.commerce.price({ min: 5, max: 50 }))
        : 0,
      shippingMethod: faker.helpers.arrayElement([
        "Standard",
        "Express",
        "Next Day",
        "Free Shipping",
      ]),
      notes: faker.lorem.sentence(),
    }),
  },
  shipment: {
    label: "Shipment / Delivery / Tracking",
    generator: () => ({
      id: faker.string.uuid(),
      trackingNumber: faker.string.alphanumeric(16).toUpperCase(),
      orderId: faker.string.alphanumeric(10).toUpperCase(),
      carrier: faker.helpers.arrayElement([
        "FedEx",
        "UPS",
        "DHL",
        "USPS",
        "Amazon Logistics",
      ]),
      serviceType: faker.helpers.arrayElement([
        "Standard",
        "Express",
        "Overnight",
        "2-Day",
        "Ground",
      ]),
      status: faker.helpers.arrayElement([
        "pending",
        "in-transit",
        "out-for-delivery",
        "delivered",
        "delayed",
        "failed",
      ]),
      senderName: faker.person.fullName(),
      senderAddress: {
        street: faker.location.streetAddress(),
        city: faker.location.city(),
        state: faker.location.state(),
        zipCode: faker.location.zipCode(),
        country: faker.location.country(),
      },
      recipientName: faker.person.fullName(),
      recipientPhone: faker.phone.number(),
      recipientAddress: {
        street: faker.location.streetAddress(),
        city: faker.location.city(),
        state: faker.location.state(),
        zipCode: faker.location.zipCode(),
        country: faker.location.country(),
      },
      weight: faker.number.float({ min: 0.5, max: 50, fractionDigits: 2 }),
      weightUnit: "lbs",
      dimensions: {
        length: faker.number.float({ min: 5, max: 50, fractionDigits: 1 }),
        width: faker.number.float({ min: 5, max: 50, fractionDigits: 1 }),
        height: faker.number.float({ min: 5, max: 50, fractionDigits: 1 }),
        unit: "inches",
      },
      shippingCost: parseFloat(faker.commerce.price({ min: 5, max: 100 })),
      estimatedDelivery: faker.date.soon().toISOString().split("T")[0],
      actualDelivery: faker.datatype.boolean()
        ? faker.date.recent().toISOString().split("T")[0]
        : null,
      shipDate: faker.date.recent().toISOString().split("T")[0],
      signatureRequired: faker.datatype.boolean(),
      insuranceValue: parseFloat(faker.commerce.price({ min: 50, max: 5000 })),
      trackingEvents: faker.helpers.arrayElements(
        [
          {
            timestamp: faker.date.recent().toISOString(),
            location: faker.location.city(),
            status: "Picked up",
            description: "Package picked up by carrier",
          },
          {
            timestamp: faker.date.recent().toISOString(),
            location: faker.location.city(),
            status: "In transit",
            description: "Package in transit",
          },
        ],
        { min: 1, max: 5 }
      ),
      notes: faker.lorem.sentence(),
    }),
  },
  return: {
    label: "Return / Exchange",
    generator: () => ({
      id: faker.string.uuid(),
      returnNumber: `RET-${faker.string.alphanumeric(10).toUpperCase()}`,
      orderId: faker.string.alphanumeric(10).toUpperCase(),
      orderDate: faker.date.past().toISOString().split("T")[0],
      returnDate: faker.date.recent().toISOString().split("T")[0],
      type: faker.helpers.arrayElement(["return", "exchange", "refund"]),
      status: faker.helpers.arrayElement([
        "initiated",
        "approved",
        "rejected",
        "received",
        "inspecting",
        "completed",
        "refunded",
      ]),
      reason: faker.helpers.arrayElement([
        "Defective",
        "Wrong Item",
        "Not as Described",
        "Changed Mind",
        "Size Issue",
        "Damaged in Transit",
        "Better Price Found",
      ]),
      customerName: faker.person.fullName(),
      customerEmail: faker.internet.email(),
      customerPhone: faker.phone.number(),
      items: faker.helpers.arrayElements(
        [
          {
            productId: faker.string.uuid(),
            name: faker.commerce.productName(),
            sku: faker.string.alphanumeric(8).toUpperCase(),
            quantity: faker.number.int({ min: 1, max: 3 }),
            price: parseFloat(faker.commerce.price()),
            condition: faker.helpers.arrayElement([
              "Unopened",
              "Opened",
              "Used",
              "Damaged",
            ]),
          },
        ],
        { min: 1, max: 3 }
      ),
      refundAmount: parseFloat(faker.commerce.price({ min: 20, max: 500 })),
      refundMethod: faker.helpers.arrayElement([
        "Original Payment Method",
        "Store Credit",
        "Exchange",
        "Gift Card",
      ]),
      restockingFee: faker.datatype.boolean()
        ? parseFloat(faker.commerce.price({ min: 5, max: 50 }))
        : 0,
      returnShippingCost: parseFloat(faker.commerce.price({ min: 0, max: 15 })),
      returnTrackingNumber: faker.string.alphanumeric(16).toUpperCase(),
      returnCarrier: faker.helpers.arrayElement([
        "FedEx",
        "UPS",
        "DHL",
        "USPS",
      ]),
      refundStatus: faker.helpers.arrayElement([
        "pending",
        "processing",
        "completed",
        "failed",
      ]),
      refundedDate: faker.datatype.boolean()
        ? faker.date.recent().toISOString().split("T")[0]
        : null,
      exchangeProductId: faker.datatype.boolean() ? faker.string.uuid() : null,
      exchangeProductName: faker.datatype.boolean()
        ? faker.commerce.productName()
        : null,
      notes: faker.lorem.sentence(),
      customerComments: faker.lorem.paragraph(),
      resolutionNotes: faker.lorem.sentence(),
    }),
  },
  subscription: {
    label: "Subscription / Renewal",
    generator: () => ({
      id: faker.string.uuid(),
      subscriptionId: faker.string.alphanumeric(12).toUpperCase(),
      userId: faker.string.uuid(),
      userName: faker.person.fullName(),
      userEmail: faker.internet.email(),
      planName: faker.helpers.arrayElement([
        "Basic",
        "Pro",
        "Premium",
        "Enterprise",
        "Starter",
        "Business",
      ]),
      planType: faker.helpers.arrayElement([
        "Individual",
        "Team",
        "Organization",
      ]),
      status: faker.helpers.arrayElement([
        "active",
        "paused",
        "cancelled",
        "expired",
        "trial",
        "past_due",
      ]),
      billingCycle: faker.helpers.arrayElement([
        "monthly",
        "quarterly",
        "semi-annual",
        "annual",
      ]),
      price: parseFloat(faker.commerce.price({ min: 9, max: 999 })),
      currency: faker.helpers.arrayElement(["USD", "EUR", "GBP", "CAD"]),
      startDate: faker.date.past({ years: 2 }).toISOString().split("T")[0],
      currentPeriodStart: faker.date.recent().toISOString().split("T")[0],
      currentPeriodEnd: faker.date.soon().toISOString().split("T")[0],
      renewalDate: faker.date.soon().toISOString().split("T")[0],
      cancelledAt: faker.datatype.boolean()
        ? faker.date.recent().toISOString().split("T")[0]
        : null,
      trialEnd: faker.datatype.boolean()
        ? faker.date.past().toISOString().split("T")[0]
        : null,
      autoRenew: faker.datatype.boolean(),
      paymentMethod: faker.helpers.arrayElement([
        "Credit Card",
        "PayPal",
        "Bank Transfer",
        "Apple Pay",
        "Google Pay",
      ]),
      cardLastFour: faker.string.numeric(4),
      features: faker.helpers.arrayElements(
        [
          "Unlimited Storage",
          "Priority Support",
          "API Access",
          "Custom Domain",
          "Advanced Analytics",
          "Team Collaboration",
          "White Label",
          "SSO",
        ],
        { min: 3, max: 6 }
      ),
      seats: faker.number.int({ min: 1, max: 100 }),
      usedSeats: faker.number.int({ min: 1, max: 50 }),
      discount: faker.datatype.boolean()
        ? {
            code: faker.string.alphanumeric(8).toUpperCase(),
            amount: faker.number.int({ min: 10, max: 50 }),
            type: faker.helpers.arrayElement(["percent", "fixed"]),
          }
        : null,
      nextBillingAmount: parseFloat(faker.commerce.price({ min: 9, max: 999 })),
      totalBilled: parseFloat(faker.commerce.price({ min: 100, max: 10000 })),
      invoiceCount: faker.number.int({ min: 1, max: 50 }),
      lastInvoiceDate: faker.date.recent().toISOString().split("T")[0],
      metadata: {
        referralCode: faker.string.alphanumeric(8).toUpperCase(),
        source: faker.helpers.arrayElement([
          "Website",
          "Mobile App",
          "Partner",
          "Sales",
        ]),
      },
      notes: faker.lorem.sentence(),
    }),
  },
  article: {
    label: "Article / BlogPost / NewsItem",
    generator: () => ({
      id: faker.string.uuid(),
      slug: faker.lorem.slug(),
      title: faker.lorem.words({ min: 3, max: 8 }),
      subtitle: faker.lorem.sentence(),
      content: faker.lorem.paragraphs({ min: 3, max: 10 }, "\n\n"),
      excerpt: faker.lorem.paragraph(),
      author: faker.person.fullName(),
      authorEmail: faker.internet.email(),
      category: faker.helpers.arrayElement([
        "Technology",
        "Business",
        "Health",
        "Lifestyle",
        "Travel",
        "Food",
        "Sports",
        "Entertainment",
        "Science",
        "Politics",
      ]),
      tags: faker.helpers.arrayElements(
        [
          "featured",
          "trending",
          "breaking",
          "opinion",
          "analysis",
          "review",
          "tutorial",
          "news",
        ],
        { min: 1, max: 4 }
      ),
      status: faker.helpers.arrayElement([
        "draft",
        "published",
        "scheduled",
        "archived",
        "review",
      ]),
      publishedAt: faker.date.past({ years: 1 }).toISOString(),
      updatedAt: faker.date.recent({ days: 30 }).toISOString(),
      scheduledFor: faker.datatype.boolean()
        ? faker.date.future().toISOString()
        : null,
      featuredImage: faker.image.url(),
      views: faker.number.int({ min: 0, max: 100000 }),
      likes: faker.number.int({ min: 0, max: 10000 }),
      comments: faker.number.int({ min: 0, max: 500 }),
      shares: faker.number.int({ min: 0, max: 1000 }),
      readTime: faker.number.int({ min: 1, max: 20 }),
      seoTitle: faker.lorem.words({ min: 5, max: 10 }),
      seoDescription: faker.lorem.sentence(),
      seoKeywords: faker.helpers.arrayElements(
        ["tech", "business", "health", "news", "trending", "guide", "tips"],
        { min: 3, max: 6 }
      ),
      language: faker.helpers.arrayElement([
        "en",
        "es",
        "fr",
        "de",
        "zh",
        "ja",
        "pt",
      ]),
      featured: faker.datatype.boolean(),
      allowComments: faker.datatype.boolean(),
    }),
  },
  document: {
    label: "Document / File / Attachment",
    generator: () => ({
      id: faker.string.uuid(),
      fileName: `${faker.lorem
        .words(2)
        .replace(/ /g, "_")}.${faker.helpers.arrayElement([
        "pdf",
        "docx",
        "xlsx",
        "pptx",
        "txt",
        "csv",
      ])}`,
      originalName: `${faker.lorem.words({
        min: 2,
        max: 4,
      })}.${faker.helpers.arrayElement([
        "pdf",
        "docx",
        "xlsx",
        "pptx",
        "txt",
        "csv",
      ])}`,
      mimeType: faker.system.mimeType(),
      size: faker.number.int({ min: 1024, max: 10485760 }),
      sizeFormatted: `${faker.number.float({
        min: 0.1,
        max: 10,
        fractionDigits: 2,
      })} MB`,
      type: faker.helpers.arrayElement([
        "PDF",
        "Word Document",
        "Spreadsheet",
        "Presentation",
        "Text File",
        "CSV",
        "Image",
      ]),
      category: faker.helpers.arrayElement([
        "Contract",
        "Report",
        "Invoice",
        "Proposal",
        "Manual",
        "Policy",
        "Resume",
        "Certificate",
      ]),
      status: faker.helpers.arrayElement([
        "active",
        "archived",
        "deleted",
        "draft",
        "approved",
        "pending",
      ]),
      uploadedBy: faker.person.fullName(),
      uploadedAt: faker.date.past({ years: 2 }).toISOString(),
      modifiedAt: faker.date.recent({ days: 60 }).toISOString(),
      accessedAt: faker.date.recent({ days: 7 }).toISOString(),
      url: faker.internet.url(),
      downloadUrl: `${faker.internet.url()}/download`,
      thumbnailUrl: faker.image.url(),
      folder: faker.helpers.arrayElement([
        "Documents",
        "Contracts",
        "Reports",
        "Personal",
        "Work",
        "Archive",
      ]),
      path: `/${faker.helpers.arrayElement([
        "documents",
        "files",
        "uploads",
      ])}/${faker.lorem.word()}`,
      version: faker.number.int({ min: 1, max: 10 }),
      tags: faker.helpers.arrayElements(
        ["important", "confidential", "draft", "final", "review", "signed"],
        { min: 1, max: 3 }
      ),
      permissions: faker.helpers.arrayElement([
        "public",
        "private",
        "restricted",
        "team",
      ]),
      sharedWith: faker.helpers.arrayElements(
        [
          faker.internet.email(),
          faker.internet.email(),
          faker.internet.email(),
        ],
        { min: 0, max: 3 }
      ),
      downloads: faker.number.int({ min: 0, max: 1000 }),
      checksum: faker.git.commitSha(),
      encrypted: faker.datatype.boolean(),
      password_protected: faker.datatype.boolean(),
    }),
  },
  image: {
    label: "Image / Photo / Gallery",
    generator: () => ({
      id: faker.string.uuid(),
      fileName: `${faker.lorem.word()}_${faker.number.int({
        min: 1000,
        max: 9999,
      })}.${faker.helpers.arrayElement(["jpg", "png", "webp", "gif", "svg"])}`,
      title: faker.lorem.words({ min: 2, max: 5 }),
      description: faker.lorem.sentence(),
      altText: faker.lorem.words({ min: 3, max: 8 }),
      url: faker.image.url(),
      thumbnailUrl: faker.image.urlLoremFlickr({ category: "abstract" }),
      width: faker.helpers.arrayElement([
        1920, 1280, 1024, 800, 640, 3840, 2560,
      ]),
      height: faker.helpers.arrayElement([
        1080, 720, 768, 600, 480, 2160, 1440,
      ]),
      size: faker.number.int({ min: 102400, max: 10485760 }),
      sizeFormatted: `${faker.number.float({
        min: 0.1,
        max: 10,
        fractionDigits: 2,
      })} MB`,
      format: faker.helpers.arrayElement([
        "JPEG",
        "PNG",
        "WebP",
        "GIF",
        "SVG",
        "HEIC",
      ]),
      mimeType: faker.system.mimeType(),
      orientation: faker.helpers.arrayElement([
        "landscape",
        "portrait",
        "square",
      ]),
      category: faker.helpers.arrayElement([
        "Nature",
        "Urban",
        "People",
        "Abstract",
        "Food",
        "Architecture",
        "Animals",
        "Technology",
      ]),
      tags: faker.helpers.arrayElements(
        [
          "sunset",
          "cityscape",
          "portrait",
          "nature",
          "macro",
          "black-white",
          "colorful",
          "minimalist",
        ],
        { min: 2, max: 5 }
      ),
      photographer: faker.person.fullName(),
      uploadedBy: faker.person.fullName(),
      uploadedAt: faker.date.past({ years: 2 }).toISOString(),
      takenAt: faker.date.past({ years: 5 }).toISOString(),
      camera: faker.helpers.arrayElement([
        "Canon EOS R5",
        "Nikon D850",
        "Sony A7 IV",
        "iPhone 15 Pro",
        "Google Pixel 8",
        "Unknown",
      ]),
      lens: faker.datatype.boolean()
        ? faker.helpers.arrayElement([
            "24-70mm f/2.8",
            "50mm f/1.8",
            "85mm f/1.4",
            "16-35mm f/4",
          ])
        : null,
      settings: {
        iso: faker.helpers.arrayElement([100, 200, 400, 800, 1600, 3200]),
        aperture: faker.helpers.arrayElement([
          "f/1.8",
          "f/2.8",
          "f/4",
          "f/5.6",
          "f/8",
          "f/11",
        ]),
        shutterSpeed: faker.helpers.arrayElement([
          "1/1000",
          "1/500",
          "1/250",
          "1/125",
          "1/60",
          "1/30",
        ]),
        focalLength: faker.helpers.arrayElement([
          "24mm",
          "35mm",
          "50mm",
          "85mm",
          "100mm",
        ]),
      },
      location: {
        city: faker.location.city(),
        country: faker.location.country(),
        latitude: faker.location.latitude(),
        longitude: faker.location.longitude(),
      },
      views: faker.number.int({ min: 0, max: 100000 }),
      downloads: faker.number.int({ min: 0, max: 10000 }),
      likes: faker.number.int({ min: 0, max: 5000 }),
      featured: faker.datatype.boolean(),
      public: faker.datatype.boolean(),
      gallery: faker.datatype.boolean() ? faker.lorem.words(2) : null,
    }),
  },
  video: {
    label: "Video / Audio / Podcast",
    generator: () => ({
      id: faker.string.uuid(),
      title: faker.lorem.words({ min: 3, max: 8 }),
      description: faker.lorem.paragraph(),
      type: faker.helpers.arrayElement([
        "video",
        "audio",
        "podcast",
        "livestream",
        "webinar",
      ]),
      fileName: `${faker.lorem
        .words(2)
        .replace(/ /g, "_")}.${faker.helpers.arrayElement([
        "mp4",
        "mov",
        "avi",
        "mkv",
        "mp3",
        "wav",
        "m4a",
      ])}`,
      url: faker.internet.url(),
      thumbnailUrl: faker.image.url(),
      duration: faker.number.int({ min: 30, max: 7200 }),
      durationFormatted: `${faker.number.int({
        min: 1,
        max: 120,
      })}:${faker.string.numeric(2)}`,
      size: faker.number.int({ min: 1048576, max: 1073741824 }),
      sizeFormatted: `${faker.number.float({
        min: 1,
        max: 1024,
        fractionDigits: 2,
      })} MB`,
      format: faker.helpers.arrayElement([
        "MP4",
        "MOV",
        "AVI",
        "MKV",
        "MP3",
        "WAV",
        "M4A",
      ]),
      codec: faker.helpers.arrayElement([
        "H.264",
        "H.265",
        "VP9",
        "AAC",
        "MP3",
        "FLAC",
      ]),
      resolution: faker.helpers.arrayElement([
        "4K",
        "1080p",
        "720p",
        "480p",
        "Audio Only",
      ]),
      bitrate: faker.helpers.arrayElement([
        "128 kbps",
        "256 kbps",
        "320 kbps",
        "2 Mbps",
        "5 Mbps",
        "10 Mbps",
      ]),
      category: faker.helpers.arrayElement([
        "Tutorial",
        "Entertainment",
        "Education",
        "Music",
        "News",
        "Gaming",
        "Technology",
        "Lifestyle",
      ]),
      tags: faker.helpers.arrayElements(
        [
          "trending",
          "popular",
          "new",
          "featured",
          "premium",
          "educational",
          "funny",
          "inspiring",
        ],
        { min: 2, max: 5 }
      ),
      creator: faker.person.fullName(),
      creatorEmail: faker.internet.email(),
      uploadedAt: faker.date.past({ years: 2 }).toISOString(),
      publishedAt: faker.date.past({ years: 1 }).toISOString(),
      status: faker.helpers.arrayElement([
        "published",
        "draft",
        "processing",
        "scheduled",
        "private",
        "unlisted",
      ]),
      views: faker.number.int({ min: 0, max: 10000000 }),
      likes: faker.number.int({ min: 0, max: 500000 }),
      dislikes: faker.number.int({ min: 0, max: 10000 }),
      comments: faker.number.int({ min: 0, max: 50000 }),
      shares: faker.number.int({ min: 0, max: 100000 }),
      subscribers: faker.number.int({ min: 0, max: 1000000 }),
      language: faker.helpers.arrayElement([
        "en",
        "es",
        "fr",
        "de",
        "zh",
        "ja",
        "pt",
        "ar",
      ]),
      subtitles: faker.helpers.arrayElements(["en", "es", "fr", "de", "zh"], {
        min: 0,
        max: 3,
      }),
      monetized: faker.datatype.boolean(),
      ageRestricted: faker.datatype.boolean(),
      downloadable: faker.datatype.boolean(),
      embedAllowed: faker.datatype.boolean(),
      playlist: faker.datatype.boolean() ? faker.lorem.words(3) : null,
      season: faker.datatype.boolean()
        ? faker.number.int({ min: 1, max: 10 })
        : null,
      episode: faker.datatype.boolean()
        ? faker.number.int({ min: 1, max: 50 })
        : null,
    }),
  },
  report: {
    label: "Report / Presentation",
    generator: () => ({
      id: faker.string.uuid(),
      reportId: faker.string.alphanumeric(12).toUpperCase(),
      title: faker.lorem.words({ min: 3, max: 8 }),
      subtitle: faker.lorem.sentence(),
      type: faker.helpers.arrayElement([
        "Financial Report",
        "Sales Report",
        "Analytics Report",
        "Progress Report",
        "Research Report",
        "Presentation",
        "Proposal",
      ]),
      category: faker.helpers.arrayElement([
        "Financial",
        "Marketing",
        "Sales",
        "Operations",
        "HR",
        "Technical",
        "Strategic",
        "Quarterly",
      ]),
      status: faker.helpers.arrayElement([
        "draft",
        "in-review",
        "approved",
        "published",
        "archived",
      ]),
      author: faker.person.fullName(),
      authorEmail: faker.internet.email(),
      department: faker.commerce.department(),
      createdAt: faker.date.past({ years: 2 }).toISOString(),
      updatedAt: faker.date.recent({ days: 30 }).toISOString(),
      publishedAt: faker.datatype.boolean()
        ? faker.date.past({ years: 1 }).toISOString()
        : null,
      period: faker.helpers.arrayElement([
        "Q1 2024",
        "Q2 2024",
        "Q3 2024",
        "Q4 2024",
        "2024",
        "January 2024",
        "H1 2024",
      ]),
      dateRange: {
        from: faker.date.past({ years: 1 }).toISOString().split("T")[0],
        to: faker.date.recent().toISOString().split("T")[0],
      },
      format: faker.helpers.arrayElement([
        "PDF",
        "PowerPoint",
        "Excel",
        "Word",
        "Google Docs",
        "Interactive Dashboard",
      ]),
      pages: faker.number.int({ min: 5, max: 100 }),
      fileSize: faker.number.int({ min: 524288, max: 52428800 }),
      fileSizeFormatted: `${faker.number.float({
        min: 0.5,
        max: 50,
        fractionDigits: 2,
      })} MB`,
      url: faker.internet.url(),
      downloadUrl: `${faker.internet.url()}/download`,
      thumbnailUrl: faker.image.url(),
      summary: faker.lorem.paragraph(),
      keyFindings: faker.helpers.arrayElements(
        [
          faker.lorem.sentence(),
          faker.lorem.sentence(),
          faker.lorem.sentence(),
        ],
        { min: 3, max: 5 }
      ),
      metrics: {
        revenue: faker.number.int({ min: 100000, max: 10000000 }),
        growth: faker.number.float({ min: -10, max: 50, fractionDigits: 1 }),
        customers: faker.number.int({ min: 100, max: 100000 }),
        satisfaction: faker.number.float({ min: 1, max: 5, fractionDigits: 1 }),
      },
      tags: faker.helpers.arrayElements(
        [
          "quarterly",
          "annual",
          "financial",
          "strategic",
          "confidential",
          "public",
        ],
        { min: 2, max: 4 }
      ),
      visibility: faker.helpers.arrayElement([
        "public",
        "internal",
        "confidential",
        "restricted",
      ]),
      sharedWith: faker.helpers.arrayElements(
        [
          faker.person.fullName(),
          faker.person.fullName(),
          faker.person.fullName(),
        ],
        { min: 1, max: 5 }
      ),
      views: faker.number.int({ min: 0, max: 1000 }),
      downloads: faker.number.int({ min: 0, max: 500 }),
      approvedBy: faker.datatype.boolean() ? faker.person.fullName() : null,
      approvalDate: faker.datatype.boolean()
        ? faker.date.recent({ days: 10 }).toISOString().split("T")[0]
        : null,
      version: faker.number.int({ min: 1, max: 10 }),
      notes: faker.lorem.sentence(),
    }),
  },
  template: {
    label: "Template / Form",
    generator: () => ({
      id: faker.string.uuid(),
      templateId: faker.string.alphanumeric(10).toUpperCase(),
      name: faker.lorem.words({ min: 2, max: 5 }),
      description: faker.lorem.paragraph(),
      type: faker.helpers.arrayElement([
        "Form",
        "Document Template",
        "Email Template",
        "Report Template",
        "Contract Template",
        "Invoice Template",
        "Survey",
      ]),
      category: faker.helpers.arrayElement([
        "Business",
        "Legal",
        "Marketing",
        "HR",
        "Sales",
        "Finance",
        "Education",
        "Personal",
      ]),
      status: faker.helpers.arrayElement([
        "active",
        "draft",
        "archived",
        "published",
      ]),
      version: faker.number.int({ min: 1, max: 20 }),
      language: faker.helpers.arrayElement([
        "en",
        "es",
        "fr",
        "de",
        "zh",
        "ja",
      ]),
      format: faker.helpers.arrayElement([
        "PDF",
        "DOCX",
        "HTML",
        "JSON",
        "XML",
        "Google Form",
        "Typeform",
      ]),
      createdBy: faker.person.fullName(),
      createdAt: faker.date.past({ years: 2 }).toISOString(),
      updatedAt: faker.date.recent({ days: 30 }).toISOString(),
      lastUsed: faker.datatype.boolean()
        ? faker.date.recent({ days: 60 }).toISOString()
        : null,
      usageCount: faker.number.int({ min: 0, max: 10000 }),
      fields: faker.helpers.arrayElements(
        [
          { name: "firstName", type: "text", required: true },
          { name: "lastName", type: "text", required: true },
          { name: "email", type: "email", required: true },
          { name: "phone", type: "tel", required: false },
          { name: "message", type: "textarea", required: false },
          { name: "subscribe", type: "checkbox", required: false },
          { name: "rating", type: "number", required: false },
          { name: "date", type: "date", required: false },
        ],
        { min: 3, max: 8 }
      ),
      sections: faker.number.int({ min: 1, max: 10 }),
      pages: faker.number.int({ min: 1, max: 5 }),
      tags: faker.helpers.arrayElements(
        [
          "popular",
          "featured",
          "premium",
          "free",
          "customizable",
          "professional",
        ],
        { min: 2, max: 4 }
      ),
      thumbnail: faker.image.url(),
      previewUrl: faker.internet.url(),
      downloadUrl: `${faker.internet.url()}/download`,
      visibility: faker.helpers.arrayElement([
        "public",
        "private",
        "team",
        "organization",
      ]),
      featured: faker.datatype.boolean(),
      premium: faker.datatype.boolean(),
      price: faker.datatype.boolean()
        ? parseFloat(faker.commerce.price({ min: 0, max: 99 }))
        : 0,
      rating: faker.number.float({ min: 1, max: 5, fractionDigits: 1 }),
      reviews: faker.number.int({ min: 0, max: 1000 }),
      downloads: faker.number.int({ min: 0, max: 50000 }),
      favorites: faker.number.int({ min: 0, max: 5000 }),
      customizable: faker.datatype.boolean(),
      responsive: faker.datatype.boolean(),
      integrations: faker.helpers.arrayElements(
        ["Zapier", "Slack", "Email", "Google Sheets", "Salesforce", "HubSpot"],
        { min: 0, max: 4 }
      ),
      notifications: faker.datatype.boolean(),
      autoSave: faker.datatype.boolean(),
      allowDuplicates: faker.datatype.boolean(),
      expiresAt: faker.datatype.boolean()
        ? faker.date.future().toISOString()
        : null,
    }),
  },
  event: {
    label: "Event / Meeting / Appointment",
    generator: () => ({
      id: faker.string.uuid(),
      eventId: faker.string.alphanumeric(10).toUpperCase(),
      title: faker.lorem.words({ min: 2, max: 6 }),
      description: faker.lorem.paragraph(),
      type: faker.helpers.arrayElement([
        "Meeting",
        "Conference",
        "Workshop",
        "Webinar",
        "Appointment",
        "Social Event",
        "Training",
        "Interview",
      ]),
      category: faker.helpers.arrayElement([
        "Business",
        "Personal",
        "Work",
        "Team Meeting",
        "Client Meeting",
        "Social",
        "Education",
        "Health",
      ]),
      status: faker.helpers.arrayElement([
        "scheduled",
        "confirmed",
        "cancelled",
        "completed",
        "rescheduled",
        "pending",
      ]),
      startDate: faker.date.future().toISOString(),
      endDate: faker.date.future().toISOString(),
      startTime: `${faker.number.int({
        min: 8,
        max: 17,
      })}:${faker.helpers.arrayElement(["00", "15", "30", "45"])}`,
      endTime: `${faker.number.int({
        min: 9,
        max: 18,
      })}:${faker.helpers.arrayElement(["00", "15", "30", "45"])}`,
      duration: faker.number.int({ min: 15, max: 480 }),
      durationFormatted: `${faker.number.int({ min: 1, max: 8 })} hours`,
      timezone: faker.helpers.arrayElement([
        "UTC",
        "EST",
        "PST",
        "GMT",
        "CET",
        "IST",
        "JST",
      ]),
      location: faker.helpers.arrayElement([
        faker.location.streetAddress(),
        "Virtual - Zoom",
        "Virtual - Google Meet",
        "Virtual - Microsoft Teams",
        faker.company.name() + " Office",
      ]),
      room: faker.datatype.boolean()
        ? `Room ${faker.number.int({ min: 100, max: 999 })}`
        : null,
      virtual: faker.datatype.boolean(),
      meetingLink: faker.datatype.boolean() ? faker.internet.url() : null,
      organizer: faker.person.fullName(),
      organizerEmail: faker.internet.email(),
      attendees: faker.helpers.arrayElements(
        [
          {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            status: faker.helpers.arrayElement([
              "accepted",
              "declined",
              "tentative",
              "pending",
            ]),
          },
          {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            status: faker.helpers.arrayElement([
              "accepted",
              "declined",
              "tentative",
              "pending",
            ]),
          },
          {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            status: faker.helpers.arrayElement([
              "accepted",
              "declined",
              "tentative",
              "pending",
            ]),
          },
        ],
        { min: 1, max: 10 }
      ),
      maxAttendees: faker.number.int({ min: 5, max: 500 }),
      currentAttendees: faker.number.int({ min: 0, max: 50 }),
      agenda: faker.helpers.arrayElements(
        [
          faker.lorem.sentence(),
          faker.lorem.sentence(),
          faker.lorem.sentence(),
        ],
        { min: 2, max: 5 }
      ),
      recurring: faker.datatype.boolean(),
      recurrencePattern: faker.datatype.boolean()
        ? faker.helpers.arrayElement(["daily", "weekly", "monthly", "yearly"])
        : null,
      reminderSet: faker.datatype.boolean(),
      reminderTime: faker.helpers.arrayElement([
        "15 minutes",
        "30 minutes",
        "1 hour",
        "1 day",
      ]),
      priority: faker.helpers.arrayElement(["low", "medium", "high", "urgent"]),
      tags: faker.helpers.arrayElements(
        ["important", "team", "client", "training", "review", "planning"],
        { min: 1, max: 3 }
      ),
      attachments: faker.helpers.arrayElements(
        [
          { name: faker.lorem.words(2) + ".pdf", url: faker.internet.url() },
          { name: faker.lorem.words(2) + ".docx", url: faker.internet.url() },
        ],
        { min: 0, max: 3 }
      ),
      notes: faker.lorem.paragraph(),
      createdAt: faker.date.past().toISOString(),
      updatedAt: faker.date.recent({ days: 7 }).toISOString(),
      createdBy: faker.person.fullName(),
      requiresConfirmation: faker.datatype.boolean(),
      allowGuestInvites: faker.datatype.boolean(),
      recordMeeting: faker.datatype.boolean(),
    }),
  },
  reservation: {
    label: "Reservation / Booking / Rental",
    generator: () => ({
      id: faker.string.uuid(),
      confirmationNumber: faker.string.alphanumeric(12).toUpperCase(),
      type: faker.helpers.arrayElement([
        "Hotel",
        "Restaurant",
        "Car Rental",
        "Flight",
        "Venue",
        "Equipment",
        "Room",
        "Table",
        "Appointment",
      ]),
      status: faker.helpers.arrayElement([
        "confirmed",
        "pending",
        "cancelled",
        "completed",
        "no-show",
        "modified",
      ]),
      guestName: faker.person.fullName(),
      guestEmail: faker.internet.email(),
      guestPhone: faker.phone.number(),
      numberOfGuests: faker.number.int({ min: 1, max: 10 }),
      checkInDate: faker.date.future().toISOString().split("T")[0],
      checkOutDate: faker.date.future().toISOString().split("T")[0],
      checkInTime: `${faker.number.int({ min: 6, max: 23 })}:00`,
      checkOutTime: `${faker.number.int({ min: 6, max: 23 })}:00`,
      duration: faker.number.int({ min: 1, max: 14 }),
      durationUnit: faker.helpers.arrayElement(["hours", "days", "weeks"]),
      itemBooked: faker.helpers.arrayElement([
        `Room ${faker.number.int({ min: 100, max: 999 })}`,
        `Table ${faker.number.int({ min: 1, max: 50 })}`,
        faker.vehicle.vehicle(),
        faker.lorem.words(2),
      ]),
      itemType: faker.helpers.arrayElement([
        "Deluxe Room",
        "Suite",
        "Standard Room",
        "Window Table",
        "Outdoor Table",
        "SUV",
        "Sedan",
        "Conference Room",
        "Studio",
      ]),
      price: parseFloat(faker.commerce.price({ min: 50, max: 1000 })),
      currency: faker.helpers.arrayElement(["USD", "EUR", "GBP", "CAD"]),
      deposit: parseFloat(faker.commerce.price({ min: 0, max: 200 })),
      totalAmount: parseFloat(faker.commerce.price({ min: 100, max: 5000 })),
      paymentStatus: faker.helpers.arrayElement([
        "paid",
        "pending",
        "partial",
        "refunded",
        "failed",
      ]),
      paymentMethod: faker.helpers.arrayElement([
        "Credit Card",
        "PayPal",
        "Cash",
        "Bank Transfer",
        "Apple Pay",
      ]),
      location: {
        name: faker.company.name(),
        address: faker.location.streetAddress(),
        city: faker.location.city(),
        state: faker.location.state(),
        zipCode: faker.location.zipCode(),
        country: faker.location.country(),
      },
      specialRequests: faker.datatype.boolean() ? faker.lorem.sentence() : null,
      amenities: faker.helpers.arrayElements(
        [
          "WiFi",
          "Parking",
          "Breakfast",
          "Pet Friendly",
          "Pool",
          "Gym",
          "Spa",
          "Room Service",
        ],
        { min: 2, max: 5 }
      ),
      bookedAt: faker.date.past().toISOString(),
      modifiedAt: faker.datatype.boolean()
        ? faker.date.recent({ days: 7 }).toISOString()
        : null,
      cancelledAt: faker.datatype.boolean()
        ? faker.date.recent({ days: 3 }).toISOString()
        : null,
      cancellationPolicy: faker.helpers.arrayElement([
        "Free cancellation",
        "24 hours notice",
        "48 hours notice",
        "Non-refundable",
      ]),
      confirmationSent: faker.datatype.boolean(),
      reminderSent: faker.datatype.boolean(),
      source: faker.helpers.arrayElement([
        "Website",
        "Mobile App",
        "Phone",
        "Email",
        "Walk-in",
        "Third Party",
      ]),
      promoCode: faker.datatype.boolean()
        ? faker.string.alphanumeric(8).toUpperCase()
        : null,
      discount: faker.datatype.boolean()
        ? faker.number.int({ min: 5, max: 30 })
        : 0,
      rating: faker.datatype.boolean()
        ? faker.number.float({ min: 1, max: 5, fractionDigits: 1 })
        : null,
      review: faker.datatype.boolean() ? faker.lorem.paragraph() : null,
      notes: faker.lorem.sentence(),
    }),
  },
  task: {
    label: "Task / Assignment / To-Do",
    generator: () => ({
      id: faker.string.uuid(),
      taskId: faker.string.alphanumeric(10).toUpperCase(),
      title: faker.lorem.words({ min: 3, max: 8 }),
      description: faker.lorem.paragraph(),
      status: faker.helpers.arrayElement([
        "todo",
        "in-progress",
        "blocked",
        "completed",
        "cancelled",
        "on-hold",
      ]),
      priority: faker.helpers.arrayElement([
        "low",
        "medium",
        "high",
        "urgent",
        "critical",
      ]),
      type: faker.helpers.arrayElement([
        "Task",
        "Bug",
        "Feature",
        "Improvement",
        "Research",
        "Documentation",
        "Meeting",
        "Review",
      ]),
      category: faker.helpers.arrayElement([
        "Development",
        "Design",
        "Marketing",
        "Sales",
        "Support",
        "Operations",
        "HR",
        "Finance",
      ]),
      assignedTo: faker.person.fullName(),
      assignedToEmail: faker.internet.email(),
      assignedBy: faker.person.fullName(),
      assignedAt: faker.date.past().toISOString(),
      dueDate: faker.date.future().toISOString().split("T")[0],
      dueTime: faker.datatype.boolean()
        ? `${faker.number.int({
            min: 8,
            max: 17,
          })}:${faker.helpers.arrayElement(["00", "30"])}`
        : null,
      startDate: faker.date.recent().toISOString().split("T")[0],
      completedDate: faker.datatype.boolean()
        ? faker.date.recent({ days: 7 }).toISOString().split("T")[0]
        : null,
      estimatedHours: faker.number.float({
        min: 0.5,
        max: 40,
        fractionDigits: 1,
      }),
      actualHours: faker.datatype.boolean()
        ? faker.number.float({ min: 0.5, max: 50, fractionDigits: 1 })
        : null,
      progress: faker.number.int({ min: 0, max: 100 }),
      project: faker.lorem.words(3),
      projectId: faker.string.uuid(),
      sprint: faker.datatype.boolean()
        ? `Sprint ${faker.number.int({ min: 1, max: 20 })}`
        : null,
      milestone: faker.datatype.boolean() ? faker.lorem.words(2) : null,
      tags: faker.helpers.arrayElements(
        [
          "frontend",
          "backend",
          "urgent",
          "bug",
          "enhancement",
          "documentation",
          "testing",
        ],
        { min: 1, max: 4 }
      ),
      dependencies: faker.helpers.arrayElements(
        [
          faker.string.alphanumeric(10).toUpperCase(),
          faker.string.alphanumeric(10).toUpperCase(),
        ],
        { min: 0, max: 3 }
      ),
      blockers: faker.datatype.boolean() ? faker.lorem.sentence() : null,
      subtasks: faker.helpers.arrayElements(
        [
          { title: faker.lorem.words(4), completed: faker.datatype.boolean() },
          { title: faker.lorem.words(4), completed: faker.datatype.boolean() },
          { title: faker.lorem.words(4), completed: faker.datatype.boolean() },
        ],
        { min: 0, max: 5 }
      ),
      attachments: faker.helpers.arrayElements(
        [
          { name: faker.lorem.words(2) + ".png", url: faker.internet.url() },
          { name: faker.lorem.words(2) + ".pdf", url: faker.internet.url() },
        ],
        { min: 0, max: 3 }
      ),
      comments: faker.number.int({ min: 0, max: 50 }),
      watchers: faker.helpers.arrayElements(
        [
          faker.person.fullName(),
          faker.person.fullName(),
          faker.person.fullName(),
        ],
        { min: 0, max: 5 }
      ),
      recurring: faker.datatype.boolean(),
      recurrencePattern: faker.datatype.boolean()
        ? faker.helpers.arrayElement(["daily", "weekly", "monthly"])
        : null,
      reminder: faker.datatype.boolean(),
      reminderTime: faker.helpers.arrayElement([
        "1 hour before",
        "1 day before",
        "1 week before",
      ]),
      createdAt: faker.date.past().toISOString(),
      updatedAt: faker.date.recent({ days: 7 }).toISOString(),
      createdBy: faker.person.fullName(),
      labels: faker.helpers.arrayElements(
        ["important", "quick-win", "tech-debt", "needs-review"],
        { min: 0, max: 3 }
      ),
      effort: faker.helpers.arrayElement(["XS", "S", "M", "L", "XL"]),
      impact: faker.helpers.arrayElement(["Low", "Medium", "High", "Critical"]),
      notes: faker.lorem.paragraph(),
    }),
  },
  activity: {
    label: "Activity / Workout / Session",
    generator: () => ({
      id: faker.string.uuid(),
      activityId: faker.string.alphanumeric(10).toUpperCase(),
      name: faker.lorem.words({ min: 2, max: 4 }),
      type: faker.helpers.arrayElement([
        "Running",
        "Cycling",
        "Swimming",
        "Gym",
        "Yoga",
        "Hiking",
        "Walking",
        "Dancing",
        "Sports",
        "Training",
      ]),
      category: faker.helpers.arrayElement([
        "Cardio",
        "Strength",
        "Flexibility",
        "Sports",
        "Recreation",
        "Competition",
        "Training Session",
      ]),
      status: faker.helpers.arrayElement([
        "scheduled",
        "in-progress",
        "completed",
        "cancelled",
        "paused",
      ]),
      intensity: faker.helpers.arrayElement([
        "Light",
        "Moderate",
        "Vigorous",
        "High Intensity",
      ]),
      date: faker.date.recent({ days: 30 }).toISOString().split("T")[0],
      startTime: `${faker.number.int({
        min: 5,
        max: 21,
      })}:${faker.helpers.arrayElement(["00", "15", "30", "45"])}`,
      endTime: `${faker.number.int({
        min: 6,
        max: 22,
      })}:${faker.helpers.arrayElement(["00", "15", "30", "45"])}`,
      duration: faker.number.int({ min: 15, max: 180 }),
      durationFormatted: `${faker.number.int({ min: 15, max: 180 })} minutes`,
      distance: faker.datatype.boolean()
        ? faker.number.float({ min: 0.5, max: 42, fractionDigits: 2 })
        : null,
      distanceUnit: faker.helpers.arrayElement(["km", "miles", "meters"]),
      calories: faker.number.int({ min: 50, max: 1500 }),
      heartRate: {
        average: faker.number.int({ min: 60, max: 180 }),
        max: faker.number.int({ min: 120, max: 200 }),
        min: faker.number.int({ min: 50, max: 100 }),
      },
      pace: faker.datatype.boolean()
        ? `${faker.number.int({ min: 4, max: 12 })}:${faker.string.numeric(
            2
          )} min/km`
        : null,
      speed: faker.datatype.boolean()
        ? faker.number.float({ min: 5, max: 30, fractionDigits: 1 })
        : null,
      speedUnit: faker.helpers.arrayElement(["km/h", "mph"]),
      elevation: faker.datatype.boolean()
        ? faker.number.int({ min: 0, max: 1000 })
        : null,
      elevationUnit: "meters",
      steps: faker.datatype.boolean()
        ? faker.number.int({ min: 1000, max: 30000 })
        : null,
      location: faker.datatype.boolean() ? faker.location.city() : null,
      venue: faker.datatype.boolean()
        ? faker.company.name() + " Gym"
        : "Outdoor",
      weather: faker.datatype.boolean()
        ? {
            condition: faker.helpers.arrayElement([
              "Sunny",
              "Cloudy",
              "Rainy",
              "Windy",
              "Hot",
              "Cold",
            ]),
            temperature: faker.number.int({ min: -5, max: 35 }),
            temperatureUnit: "°C",
          }
        : null,
      equipment: faker.helpers.arrayElements(
        ["Treadmill", "Bike", "Weights", "Mat", "Resistance Bands", "None"],
        { min: 0, max: 3 }
      ),
      coach: faker.datatype.boolean() ? faker.person.fullName() : null,
      participants: faker.helpers.arrayElements(
        [faker.person.fullName(), faker.person.fullName()],
        { min: 0, max: 5 }
      ),
      exercises: faker.helpers.arrayElements(
        [
          {
            name: faker.lorem.words(2),
            sets: faker.number.int({ min: 1, max: 5 }),
            reps: faker.number.int({ min: 5, max: 20 }),
            weight: faker.number.int({ min: 0, max: 200 }),
          },
          {
            name: faker.lorem.words(2),
            sets: faker.number.int({ min: 1, max: 5 }),
            reps: faker.number.int({ min: 5, max: 20 }),
            weight: faker.number.int({ min: 0, max: 200 }),
          },
        ],
        { min: 0, max: 8 }
      ),
      notes: faker.lorem.sentence(),
      feeling: faker.helpers.arrayElement([
        "Great",
        "Good",
        "Average",
        "Tired",
        "Sore",
        "Energized",
      ]),
      rating: faker.number.float({ min: 1, max: 5, fractionDigits: 1 }),
      goals: faker.helpers.arrayElements(
        [
          "Weight Loss",
          "Muscle Gain",
          "Endurance",
          "Flexibility",
          "General Fitness",
        ],
        { min: 1, max: 3 }
      ),
      achievements: faker.helpers.arrayElements(
        [
          "Personal Best",
          "New Distance Record",
          "Consistent Streak",
          "Goal Achieved",
        ],
        { min: 0, max: 2 }
      ),
      photos: faker.helpers.arrayElements(
        [faker.image.url(), faker.image.url()],
        { min: 0, max: 3 }
      ),
      createdAt: faker.date.past().toISOString(),
      syncedFrom: faker.datatype.boolean()
        ? faker.helpers.arrayElement([
            "Strava",
            "Garmin",
            "Fitbit",
            "Apple Health",
            "Google Fit",
          ])
        : null,
    }),
  },
  notification: {
    label: "Notification / Reminder",
    generator: () => ({
      id: faker.string.uuid(),
      notificationId: faker.string.alphanumeric(12).toUpperCase(),
      type: faker.helpers.arrayElement([
        "reminder",
        "alert",
        "notification",
        "message",
        "update",
        "announcement",
        "warning",
        "info",
      ]),
      category: faker.helpers.arrayElement([
        "System",
        "User",
        "Task",
        "Event",
        "Payment",
        "Security",
        "Marketing",
        "Social",
        "Order",
      ]),
      title: faker.lorem.words({ min: 3, max: 6 }),
      message: faker.lorem.sentence(),
      content: faker.lorem.paragraph(),
      priority: faker.helpers.arrayElement([
        "low",
        "medium",
        "high",
        "urgent",
        "critical",
      ]),
      status: faker.helpers.arrayElement([
        "sent",
        "delivered",
        "read",
        "unread",
        "pending",
        "failed",
      ]),
      recipientId: faker.string.uuid(),
      recipientName: faker.person.fullName(),
      recipientEmail: faker.internet.email(),
      senderId: faker.datatype.boolean() ? faker.string.uuid() : null,
      senderName: faker.datatype.boolean() ? faker.person.fullName() : "System",
      channel: faker.helpers.arrayElement([
        "email",
        "sms",
        "push",
        "in-app",
        "webhook",
        "slack",
      ]),
      scheduledFor: faker.datatype.boolean()
        ? faker.date.future().toISOString()
        : null,
      sentAt: faker.date.past().toISOString(),
      deliveredAt: faker.datatype.boolean()
        ? faker.date.recent({ days: 1 }).toISOString()
        : null,
      readAt: faker.datatype.boolean()
        ? faker.date.recent({ days: 1 }).toISOString()
        : null,
      expiresAt: faker.datatype.boolean()
        ? faker.date.future().toISOString()
        : null,
      actionRequired: faker.datatype.boolean(),
      actionUrl: faker.datatype.boolean() ? faker.internet.url() : null,
      actionButton: faker.datatype.boolean()
        ? faker.helpers.arrayElement([
            "View",
            "Confirm",
            "Approve",
            "Reject",
            "Open",
            "Pay Now",
          ])
        : null,
      metadata: {
        source: faker.helpers.arrayElement([
          "Web App",
          "Mobile App",
          "Admin Panel",
          "API",
          "Scheduled Task",
        ]),
        triggeredBy: faker.helpers.arrayElement([
          "User Action",
          "System Event",
          "Schedule",
          "External API",
        ]),
        relatedId: faker.string.uuid(),
        relatedType: faker.helpers.arrayElement([
          "order",
          "task",
          "event",
          "user",
          "payment",
          "subscription",
        ]),
      },
      tags: faker.helpers.arrayElements(
        ["important", "automated", "transactional", "promotional", "system"],
        { min: 1, max: 3 }
      ),
      dismissed: faker.datatype.boolean(),
      dismissedAt: faker.datatype.boolean()
        ? faker.date.recent({ days: 1 }).toISOString()
        : null,
      retryCount: faker.number.int({ min: 0, max: 5 }),
      error: faker.datatype.boolean() ? faker.lorem.sentence() : null,
      attachments: faker.helpers.arrayElements(
        [{ name: faker.lorem.words(2) + ".pdf", url: faker.internet.url() }],
        { min: 0, max: 2 }
      ),
      template: faker.datatype.boolean() ? faker.lorem.words(3) : null,
      variables: faker.datatype.boolean()
        ? {
            userName: faker.person.firstName(),
            amount: parseFloat(faker.commerce.price()),
            date: faker.date.future().toISOString().split("T")[0],
          }
        : null,
      recurring: faker.datatype.boolean(),
      recurrencePattern: faker.datatype.boolean()
        ? faker.helpers.arrayElement(["daily", "weekly", "monthly"])
        : null,
      sound: faker.datatype.boolean(),
      vibration: faker.datatype.boolean(),
      badge: faker.datatype.boolean(),
      createdAt: faker.date.past().toISOString(),
      updatedAt: faker.date.recent({ days: 7 }).toISOString(),
    }),
  },
  address: {
    label: "Address",
    generator: () => ({
      id: faker.string.uuid(),
      addressId: faker.string.alphanumeric(10).toUpperCase(),
      label: faker.helpers.arrayElement([
        "Home",
        "Work",
        "Billing",
        "Shipping",
        "Office",
        "Other",
      ]),
      type: faker.helpers.arrayElement([
        "Residential",
        "Commercial",
        "Industrial",
        "Mixed Use",
      ]),
      streetNumber: faker.location.buildingNumber(),
      streetName: faker.location.street(),
      streetAddress: faker.location.streetAddress(),
      addressLine1: faker.location.streetAddress(),
      addressLine2: faker.datatype.boolean()
        ? `Apt ${faker.number.int({ min: 1, max: 999 })}`
        : null,
      city: faker.location.city(),
      state: faker.location.state(),
      stateAbbr: faker.location.state({ abbreviated: true }),
      county: faker.location.county(),
      zipCode: faker.location.zipCode(),
      postalCode: faker.location.zipCode(),
      country: faker.location.country(),
      countryCode: faker.location.countryCode(),
      fullAddress: `${faker.location.streetAddress()}, ${faker.location.city()}, ${faker.location.state(
        { abbreviated: true }
      )} ${faker.location.zipCode()}`,
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude(),
      coordinates: `${faker.location.latitude()}, ${faker.location.longitude()}`,
      timezone: faker.location.timeZone(),
      isPrimary: faker.datatype.boolean(),
      isVerified: faker.datatype.boolean(),
      deliveryInstructions: faker.datatype.boolean()
        ? faker.lorem.sentence()
        : null,
      accessCode: faker.datatype.boolean()
        ? faker.string.alphanumeric(6).toUpperCase()
        : null,
      floor: faker.datatype.boolean()
        ? faker.number.int({ min: 1, max: 50 })
        : null,
      building: faker.datatype.boolean() ? faker.lorem.words(2) : null,
      neighborhood: faker.datatype.boolean() ? faker.location.city() : null,
      landmarks: faker.datatype.boolean()
        ? faker.lorem.words({ min: 2, max: 5 })
        : null,
      createdAt: faker.date.past({ years: 2 }).toISOString(),
      updatedAt: faker.date.recent({ days: 30 }).toISOString(),
      validatedAt: faker.datatype.boolean()
        ? faker.date.recent({ days: 60 }).toISOString()
        : null,
    }),
  },
  geography: {
    label: "Country / State / City / ZipCode",
    generator: () => ({
      id: faker.string.uuid(),
      geoId: faker.string.alphanumeric(10).toUpperCase(),
      type: faker.helpers.arrayElement([
        "Country",
        "State",
        "City",
        "County",
        "ZipCode",
        "Region",
        "District",
      ]),
      country: faker.location.country(),
      countryCode: faker.location.countryCode(),
      countryCode3: faker.location.countryCode("alpha-3"),
      state: faker.location.state(),
      stateAbbr: faker.location.state({ abbreviated: true }),
      county: faker.location.county(),
      city: faker.location.city(),
      zipCode: faker.location.zipCode(),
      region: faker.helpers.arrayElement([
        "North",
        "South",
        "East",
        "West",
        "Central",
        "Northeast",
        "Southeast",
        "Northwest",
        "Southwest",
      ]),
      continent: faker.helpers.arrayElement([
        "Africa",
        "Antarctica",
        "Asia",
        "Europe",
        "North America",
        "Oceania",
        "South America",
      ]),
      timezone: faker.location.timeZone(),
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude(),
      coordinates: {
        lat: faker.location.latitude(),
        lng: faker.location.longitude(),
      },
      boundingBox: {
        north: faker.location.latitude(),
        south: faker.location.latitude(),
        east: faker.location.longitude(),
        west: faker.location.longitude(),
      },
      population: faker.number.int({ min: 1000, max: 50000000 }),
      area: faker.number.float({ min: 1, max: 10000000, fractionDigits: 2 }),
      areaUnit: faker.helpers.arrayElement(["sq km", "sq mi"]),
      density: faker.number.float({ min: 1, max: 10000, fractionDigits: 1 }),
      elevation: faker.number.int({ min: -100, max: 5000 }),
      elevationUnit: "meters",
      currency: faker.finance.currencyCode(),
      languages: faker.helpers.arrayElements(
        [
          "English",
          "Spanish",
          "French",
          "German",
          "Chinese",
          "Arabic",
          "Portuguese",
          "Russian",
        ],
        { min: 1, max: 3 }
      ),
      capital: faker.datatype.boolean() ? faker.location.city() : null,
      isMetropolitan: faker.datatype.boolean(),
      nearestCity: faker.location.city(),
      distanceToCapital: faker.number.int({ min: 10, max: 5000 }),
      distanceUnit: "km",
      postcodes: faker.helpers.arrayElements(
        [faker.location.zipCode(), faker.location.zipCode()],
        { min: 1, max: 5 }
      ),
      areaCodes: faker.helpers.arrayElements(
        [faker.string.numeric(3), faker.string.numeric(3)],
        { min: 1, max: 3 }
      ),
      metadata: {
        established: faker.date.past({ years: 500 }).getFullYear(),
        gdp: faker.datatype.boolean()
          ? faker.number.int({ min: 1000000, max: 1000000000000 })
          : null,
        climate: faker.helpers.arrayElement([
          "Tropical",
          "Dry",
          "Temperate",
          "Continental",
          "Polar",
        ]),
      },
    }),
  },
  office: {
    label: "Office / Branch / Store / Warehouse",
    generator: () => ({
      id: faker.string.uuid(),
      officeId: faker.string.alphanumeric(10).toUpperCase(),
      name: `${faker.company.name()} ${faker.helpers.arrayElement([
        "Office",
        "Branch",
        "Store",
        "Warehouse",
        "Facility",
        "Depot",
      ])}`,
      type: faker.helpers.arrayElement([
        "Office",
        "Branch",
        "Store",
        "Warehouse",
        "Distribution Center",
        "Fulfillment Center",
        "Showroom",
        "Factory",
      ]),
      code: faker.string.alphanumeric(6).toUpperCase(),
      status: faker.helpers.arrayElement([
        "active",
        "inactive",
        "under-construction",
        "temporarily-closed",
        "renovating",
      ]),
      size: faker.number.int({ min: 500, max: 100000 }),
      sizeUnit: faker.helpers.arrayElement(["sq ft", "sq m"]),
      capacity: faker.number.int({ min: 10, max: 1000 }),
      employees: faker.number.int({ min: 5, max: 500 }),
      manager: faker.person.fullName(),
      managerEmail: faker.internet.email(),
      managerPhone: faker.phone.number(),
      phone: faker.phone.number(),
      email: faker.internet.email(),
      website: faker.internet.url(),
      address: {
        street: faker.location.streetAddress(),
        city: faker.location.city(),
        state: faker.location.state(),
        zipCode: faker.location.zipCode(),
        country: faker.location.country(),
        latitude: faker.location.latitude(),
        longitude: faker.location.longitude(),
      },
      fullAddress: `${faker.location.streetAddress()}, ${faker.location.city()}, ${faker.location.state()} ${faker.location.zipCode()}`,
      region: faker.helpers.arrayElement([
        "North",
        "South",
        "East",
        "West",
        "Central",
      ]),
      timezone: faker.location.timeZone(),
      openingHours: {
        monday: "9:00 AM - 5:00 PM",
        tuesday: "9:00 AM - 5:00 PM",
        wednesday: "9:00 AM - 5:00 PM",
        thursday: "9:00 AM - 5:00 PM",
        friday: "9:00 AM - 5:00 PM",
        saturday: faker.helpers.arrayElement(["9:00 AM - 2:00 PM", "Closed"]),
        sunday: "Closed",
      },
      isHeadquarters: faker.datatype.boolean(),
      isWarehouse: faker.datatype.boolean(),
      hasParking: faker.datatype.boolean(),
      parkingSpaces: faker.datatype.boolean()
        ? faker.number.int({ min: 10, max: 500 })
        : null,
      floors: faker.number.int({ min: 1, max: 50 }),
      departments: faker.helpers.arrayElements(
        [
          "Sales",
          "Marketing",
          "HR",
          "IT",
          "Finance",
          "Operations",
          "Customer Service",
          "R&D",
        ],
        { min: 2, max: 6 }
      ),
      facilities: faker.helpers.arrayElements(
        [
          "Cafeteria",
          "Gym",
          "Conference Rooms",
          "Break Room",
          "Reception",
          "Security",
          "Loading Dock",
          "Storage",
        ],
        { min: 2, max: 5 }
      ),
      stockCapacity: faker.datatype.boolean()
        ? faker.number.int({ min: 1000, max: 100000 })
        : null,
      currentStock: faker.datatype.boolean()
        ? faker.number.int({ min: 100, max: 50000 })
        : null,
      yearEstablished: faker.date.past({ years: 50 }).getFullYear(),
      openedDate: faker.date.past({ years: 20 }).toISOString().split("T")[0],
      rating: faker.number.float({ min: 1, max: 5, fractionDigits: 1 }),
      reviews: faker.number.int({ min: 0, max: 5000 }),
      accessibility: faker.datatype.boolean(),
      certifications: faker.helpers.arrayElements(
        ["ISO 9001", "LEED", "Energy Star", "OSHA Certified"],
        { min: 0, max: 3 }
      ),
      security: faker.helpers.arrayElement([
        "Basic",
        "Standard",
        "High Security",
        "Maximum Security",
      ]),
      notes: faker.lorem.sentence(),
      createdAt: faker.date.past({ years: 5 }).toISOString(),
      updatedAt: faker.date.recent({ days: 30 }).toISOString(),
    }),
  },
  venue: {
    label: "Venue / Facility / Site / Floor / Room",
    generator: () => ({
      id: faker.string.uuid(),
      venueId: faker.string.alphanumeric(10).toUpperCase(),
      name: faker.helpers.arrayElement([
        `${faker.location.city()} Convention Center`,
        `${faker.company.name()} Hall`,
        `${faker.location.street()} Ballroom`,
        `${faker.person.lastName()} Arena`,
        `${faker.location.city()} Theater`,
      ]),
      type: faker.helpers.arrayElement([
        "Venue",
        "Facility",
        "Site",
        "Floor",
        "Room",
        "Hall",
        "Arena",
        "Stadium",
        "Theater",
        "Conference Center",
      ]),
      category: faker.helpers.arrayElement([
        "Conference",
        "Wedding",
        "Concert",
        "Sports",
        "Corporate",
        "Exhibition",
        "Theater",
        "Meeting",
        "Workshop",
        "Banquet",
      ]),
      code: faker.string.alphanumeric(8).toUpperCase(),
      floor: faker.datatype.boolean()
        ? faker.number.int({ min: 1, max: 50 })
        : null,
      building: faker.datatype.boolean() ? faker.lorem.words(2) : null,
      roomNumber: faker.datatype.boolean()
        ? `${faker.number.int({
            min: 100,
            max: 999,
          })}${faker.helpers.arrayElement(["", "A", "B", "C"])}`
        : null,
      capacity: faker.number.int({ min: 10, max: 50000 }),
      standingCapacity: faker.datatype.boolean()
        ? faker.number.int({ min: 100, max: 100000 })
        : null,
      seatingCapacity: faker.number.int({ min: 10, max: 50000 }),
      seatingArrangements: faker.helpers.arrayElements(
        [
          "Theater",
          "Classroom",
          "Banquet",
          "U-Shape",
          "Boardroom",
          "Cabaret",
          "Standing",
        ],
        { min: 1, max: 4 }
      ),
      size: faker.number.int({ min: 100, max: 50000 }),
      sizeUnit: faker.helpers.arrayElement(["sq ft", "sq m"]),
      dimensions: {
        length: faker.number.float({ min: 10, max: 200, fractionDigits: 1 }),
        width: faker.number.float({ min: 10, max: 150, fractionDigits: 1 }),
        height: faker.number.float({ min: 3, max: 30, fractionDigits: 1 }),
        unit: "meters",
      },
      status: faker.helpers.arrayElement([
        "available",
        "booked",
        "maintenance",
        "closed",
        "setup",
        "event-in-progress",
      ]),
      availability: faker.helpers.arrayElement([
        "24/7",
        "Business Hours",
        "By Appointment",
        "Weekends Only",
      ]),
      address: {
        street: faker.location.streetAddress(),
        city: faker.location.city(),
        state: faker.location.state(),
        zipCode: faker.location.zipCode(),
        country: faker.location.country(),
        latitude: faker.location.latitude(),
        longitude: faker.location.longitude(),
      },
      fullAddress: `${faker.location.streetAddress()}, ${faker.location.city()}, ${faker.location.state()} ${faker.location.zipCode()}`,
      manager: faker.person.fullName(),
      phone: faker.phone.number(),
      email: faker.internet.email(),
      website: faker.internet.url(),
      pricePerHour: parseFloat(faker.commerce.price({ min: 50, max: 5000 })),
      pricePerDay: parseFloat(faker.commerce.price({ min: 500, max: 50000 })),
      minimumBooking: faker.helpers.arrayElement([
        "1 hour",
        "2 hours",
        "4 hours",
        "1 day",
      ]),
      amenities: faker.helpers.arrayElements(
        [
          "WiFi",
          "Projector",
          "Sound System",
          "Stage",
          "Catering",
          "Parking",
          "AC",
          "Heating",
          "Natural Light",
          "Blackout Curtains",
          "Whiteboard",
          "Video Conferencing",
          "Kitchen",
          "Bar",
          "Dance Floor",
          "Green Room",
        ],
        { min: 3, max: 10 }
      ),
      accessibility: faker.helpers.arrayElements(
        [
          "Wheelchair Access",
          "Elevator",
          "Accessible Restrooms",
          "Ramps",
          "Braille Signage",
          "Hearing Loop",
        ],
        { min: 1, max: 4 }
      ),
      parking: {
        available: faker.datatype.boolean(),
        spaces: faker.number.int({ min: 10, max: 1000 }),
        type: faker.helpers.arrayElement([
          "Free",
          "Paid",
          "Valet",
          "Street Parking",
        ]),
        cost: faker.datatype.boolean()
          ? parseFloat(faker.commerce.price({ min: 5, max: 50 }))
          : null,
      },
      catering: {
        available: faker.datatype.boolean(),
        inHouse: faker.datatype.boolean(),
        externalAllowed: faker.datatype.boolean(),
        kitchenAvailable: faker.datatype.boolean(),
      },
      setup: {
        setupTime: `${faker.number.int({ min: 1, max: 8 })} hours`,
        teardownTime: `${faker.number.int({ min: 1, max: 4 })} hours`,
        setupIncluded: faker.datatype.boolean(),
      },
      technicalSpecs: {
        powerOutlets: faker.number.int({ min: 4, max: 50 }),
        internetSpeed: `${faker.helpers.arrayElement([
          100, 250, 500, 1000,
        ])} Mbps`,
        projectorResolution: faker.helpers.arrayElement([
          "1080p",
          "4K",
          "Not Available",
        ]),
        soundSystem: faker.helpers.arrayElement([
          "Basic",
          "Professional",
          "Premium",
          "Not Available",
        ]),
        lighting: faker.helpers.arrayElement([
          "Basic",
          "Stage Lighting",
          "Smart Lighting",
          "Natural Only",
        ]),
      },
      rating: faker.number.float({ min: 1, max: 5, fractionDigits: 1 }),
      reviews: faker.number.int({ min: 0, max: 1000 }),
      photos: faker.helpers.arrayElements(
        [faker.image.url(), faker.image.url(), faker.image.url()],
        { min: 1, max: 10 }
      ),
      virtualTourUrl: faker.datatype.boolean() ? faker.internet.url() : null,
      rules: faker.helpers.arrayElements(
        [
          "No smoking",
          "No alcohol",
          "No outside food",
          "Adult supervision required",
          "Insurance required",
          "Noise restrictions after 10 PM",
        ],
        { min: 2, max: 5 }
      ),
      cancellationPolicy: faker.helpers.arrayElement([
        "Free cancellation up to 48 hours",
        "50% refund if cancelled 7 days before",
        "Non-refundable",
        "Full refund up to 14 days before",
      ]),
      insurance: faker.datatype.boolean(),
      securityDeposit: faker.datatype.boolean()
        ? parseFloat(faker.commerce.price({ min: 500, max: 5000 }))
        : null,
      upcomingEvents: faker.number.int({ min: 0, max: 50 }),
      totalEventsHosted: faker.number.int({ min: 10, max: 5000 }),
      openedDate: faker.date.past({ years: 30 }).toISOString().split("T")[0],
      lastInspection: faker.date
        .recent({ days: 90 })
        .toISOString()
        .split("T")[0],
      certifications: faker.helpers.arrayElements(
        ["Fire Safety", "Health & Safety", "Accessibility", "Environmental"],
        { min: 1, max: 4 }
      ),
      createdAt: faker.date.past({ years: 3 }).toISOString(),
      updatedAt: faker.date.recent({ days: 30 }).toISOString(),
    }),
  },
  geopoint: {
    label: "GeoPoint / Location Coordinate",
    generator: () => ({
      id: faker.string.uuid(),
      pointId: faker.string.alphanumeric(12).toUpperCase(),
      name: faker.helpers.arrayElement([
        faker.location.city() + " Point",
        faker.location.street() + " Location",
        faker.company.name() + " Coordinates",
        faker.lorem.words(2) + " Marker",
      ]),
      type: faker.helpers.arrayElement([
        "Point",
        "Marker",
        "Waypoint",
        "Checkpoint",
        "Landmark",
        "Pin",
        "Coordinate",
      ]),
      category: faker.helpers.arrayElement([
        "Business",
        "Residential",
        "Commercial",
        "Industrial",
        "Recreation",
        "Transportation",
        "Government",
        "Education",
        "Healthcare",
        "Tourist Attraction",
      ]),
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude(),
      coordinates: {
        lat: faker.location.latitude(),
        lng: faker.location.longitude(),
      },
      geoJson: {
        type: "Point",
        coordinates: [faker.location.longitude(), faker.location.latitude()],
      },
      accuracy: faker.number.float({ min: 1, max: 100, fractionDigits: 1 }),
      accuracyUnit: "meters",
      altitude: faker.number.int({ min: -100, max: 5000 }),
      altitudeAccuracy: faker.datatype.boolean()
        ? faker.number.float({ min: 1, max: 50, fractionDigits: 1 })
        : null,
      elevation: faker.number.int({ min: -100, max: 5000 }),
      elevationUnit: "meters",
      bearing: faker.number.float({ min: 0, max: 360, fractionDigits: 1 }),
      speed: faker.datatype.boolean()
        ? faker.number.float({ min: 0, max: 120, fractionDigits: 1 })
        : null,
      speedUnit: "km/h",
      address: faker.datatype.boolean()
        ? {
            street: faker.location.streetAddress(),
            city: faker.location.city(),
            state: faker.location.state(),
            zipCode: faker.location.zipCode(),
            country: faker.location.country(),
          }
        : null,
      fullAddress: faker.datatype.boolean()
        ? `${faker.location.streetAddress()}, ${faker.location.city()}, ${faker.location.state()} ${faker.location.zipCode()}`
        : null,
      timezone: faker.location.timeZone(),
      utcOffset: faker.helpers.arrayElement([
        "-12:00",
        "-08:00",
        "-05:00",
        "+00:00",
        "+01:00",
        "+05:30",
        "+08:00",
        "+09:00",
      ]),
      plusCode: `${faker.string.alphanumeric(8).toUpperCase()}+${faker.string
        .alphanumeric(2)
        .toUpperCase()}`,
      googleMapsUrl: `https://maps.google.com/?q=${faker.location.latitude()},${faker.location.longitude()}`,
      description: faker.lorem.sentence(),
      placeId: faker.string.alphanumeric(27),
      placeName: faker.datatype.boolean() ? faker.company.name() : null,
      landmark: faker.datatype.boolean() ? faker.location.street() : null,
      nearbyPlaces: faker.helpers.arrayElements(
        [
          {
            name: faker.company.name(),
            distance: faker.number.float({
              min: 0.1,
              max: 5,
              fractionDigits: 2,
            }),
            unit: "km",
          },
          {
            name: faker.company.name(),
            distance: faker.number.float({
              min: 0.1,
              max: 5,
              fractionDigits: 2,
            }),
            unit: "km",
          },
        ],
        { min: 0, max: 5 }
      ),
      status: faker.helpers.arrayElement([
        "active",
        "inactive",
        "archived",
        "verified",
        "pending",
      ]),
      source: faker.helpers.arrayElement([
        "GPS",
        "Manual Entry",
        "Address Geocoding",
        "IP Lookup",
        "WiFi",
        "Cell Tower",
      ]),
      capturedAt: faker.date.recent({ days: 30 }).toISOString(),
      capturedBy: faker.person.fullName(),
      capturedByDevice: faker.helpers.arrayElement([
        "iOS",
        "Android",
        "GPS Device",
        "Web Browser",
        "IoT Sensor",
      ]),
      verified: faker.datatype.boolean(),
      verifiedAt: faker.datatype.boolean()
        ? faker.date.recent({ days: 7 }).toISOString()
        : null,
      tags: faker.helpers.arrayElements(
        ["important", "favorite", "visited", "planned", "shared", "public"],
        { min: 1, max: 4 }
      ),
      metadata: {
        magneticDeclination: faker.number.float({
          min: -30,
          max: 30,
          fractionDigits: 2,
        }),
        distanceFromOrigin: faker.number.float({
          min: 0,
          max: 1000,
          fractionDigits: 2,
        }),
        distanceUnit: "km",
        geohash: faker.string.alphanumeric(12),
      },
      photos: faker.helpers.arrayElements(
        [faker.image.url(), faker.image.url()],
        { min: 0, max: 5 }
      ),
      notes: faker.lorem.sentence(),
      isPublic: faker.datatype.boolean(),
      sharedWith: faker.helpers.arrayElements(
        [faker.person.fullName(), faker.person.fullName()],
        { min: 0, max: 3 }
      ),
      createdAt: faker.date.past({ years: 2 }).toISOString(),
      updatedAt: faker.date.recent({ days: 15 }).toISOString(),
    }),
  },
  company: {
    label: "Company / Organization / Institution",
    generator: () => ({
      id: faker.string.uuid(),
      companyId: faker.string.alphanumeric(10).toUpperCase(),
      name: faker.company.name(),
      legalName: `${faker.company.name()} ${faker.helpers.arrayElement([
        "Inc.",
        "LLC",
        "Ltd.",
        "Corp.",
        "GmbH",
        "S.A.",
      ])}`,
      type: faker.helpers.arrayElement([
        "Company",
        "Organization",
        "Institution",
        "Corporation",
        "Partnership",
        "Non-Profit",
        "Government Agency",
      ]),
      industry: faker.helpers.arrayElement([
        "Technology",
        "Healthcare",
        "Finance",
        "Education",
        "Manufacturing",
        "Retail",
        "Real Estate",
        "Hospitality",
        "Transportation",
        "Media",
        "Construction",
        "Agriculture",
      ]),
      sector: faker.helpers.arrayElement([
        "Private",
        "Public",
        "Non-Profit",
        "Government",
        "Cooperative",
      ]),
      status: faker.helpers.arrayElement([
        "active",
        "inactive",
        "acquired",
        "merged",
        "bankrupt",
        "dissolved",
        "restructuring",
      ]),
      size: faker.helpers.arrayElement([
        "Startup (1-10)",
        "Small (11-50)",
        "Medium (51-200)",
        "Large (201-1000)",
        "Enterprise (1000+)",
      ]),
      employeeCount: faker.number.int({ min: 1, max: 100000 }),
      foundedDate: faker.date.past({ years: 100 }).toISOString().split("T")[0],
      foundedYear: faker.date.past({ years: 100 }).getFullYear(),
      founder: faker.person.fullName(),
      ceo: faker.person.fullName(),
      headquarters: {
        address: faker.location.streetAddress(),
        city: faker.location.city(),
        state: faker.location.state(),
        zipCode: faker.location.zipCode(),
        country: faker.location.country(),
        latitude: faker.location.latitude(),
        longitude: faker.location.longitude(),
      },
      phone: faker.phone.number(),
      email: faker.internet.email(),
      website: faker.internet.url(),
      description: faker.company.catchPhrase(),
      mission: faker.lorem.sentence(),
      vision: faker.lorem.sentence(),
      values: faker.helpers.arrayElements(
        [
          "Innovation",
          "Integrity",
          "Customer Focus",
          "Excellence",
          "Teamwork",
          "Sustainability",
          "Diversity",
        ],
        { min: 3, max: 5 }
      ),
      registrationNumber: faker.string.alphanumeric(12).toUpperCase(),
      taxId: faker.string.alphanumeric(11),
      vatNumber: `${faker.location.countryCode()}${faker.string.numeric(9)}`,
      duns: faker.string.numeric(9),
      revenue: faker.number.int({ min: 100000, max: 10000000000 }),
      revenueFormatted: `$${faker.number.int({ min: 1, max: 10000 })}M`,
      fiscalYearEnd: faker.helpers.arrayElement([
        "December 31",
        "March 31",
        "June 30",
        "September 30",
      ]),
      currency: faker.finance.currencyCode(),
      stockSymbol: faker.datatype.boolean()
        ? faker.string.alpha({ length: 4, casing: "upper" })
        : null,
      isPubliclyTraded: faker.datatype.boolean(),
      stockExchange: faker.datatype.boolean()
        ? faker.helpers.arrayElement(["NYSE", "NASDAQ", "LSE", "TSE", "HKEX"])
        : null,
      marketCap: faker.datatype.boolean()
        ? faker.number.int({ min: 1000000, max: 1000000000000 })
        : null,
      ownership: faker.helpers.arrayElement([
        "Private",
        "Public",
        "Family-Owned",
        "Employee-Owned",
        "Government",
        "Partnership",
      ]),
      locations: faker.number.int({ min: 1, max: 500 }),
      offices: faker.number.int({ min: 1, max: 100 }),
      branches: faker.number.int({ min: 0, max: 1000 }),
      departments: faker.helpers.arrayElements(
        [
          "Sales",
          "Marketing",
          "HR",
          "IT",
          "Finance",
          "Operations",
          "R&D",
          "Legal",
          "Customer Service",
        ],
        { min: 3, max: 8 }
      ),
      subsidiaries: faker.helpers.arrayElements(
        [faker.company.name(), faker.company.name()],
        { min: 0, max: 5 }
      ),
      parentCompany: faker.datatype.boolean() ? faker.company.name() : null,
      competitors: faker.helpers.arrayElements(
        [faker.company.name(), faker.company.name(), faker.company.name()],
        { min: 2, max: 5 }
      ),
      partners: faker.helpers.arrayElements(
        [faker.company.name(), faker.company.name()],
        { min: 1, max: 5 }
      ),
      products: faker.helpers.arrayElements(
        [faker.commerce.productName(), faker.commerce.productName()],
        { min: 1, max: 10 }
      ),
      services: faker.helpers.arrayElements(
        ["Consulting", "Support", "Training", "Implementation", "Maintenance"],
        { min: 1, max: 5 }
      ),
      certifications: faker.helpers.arrayElements(
        [
          "ISO 9001",
          "ISO 27001",
          "SOC 2",
          "GDPR Compliant",
          "HIPAA Compliant",
          "PCI DSS",
        ],
        { min: 0, max: 4 }
      ),
      awards: faker.helpers.arrayElements(
        [
          "Best Place to Work",
          "Innovation Award",
          "Growth Award",
          "Excellence Award",
        ],
        { min: 0, max: 3 }
      ),
      socialMedia: {
        linkedin: faker.internet.url(),
        twitter: `@${faker.internet.username()}`,
        facebook: faker.internet.url(),
        instagram: `@${faker.internet.username()}`,
        youtube: faker.internet.url(),
      },
      contact: {
        generalInquiries: faker.internet.email(),
        sales: faker.internet.email(),
        support: faker.internet.email(),
        careers: faker.internet.email(),
        press: faker.internet.email(),
      },
      rating: faker.number.float({ min: 1, max: 5, fractionDigits: 1 }),
      reviews: faker.number.int({ min: 0, max: 10000 }),
      glassdoorRating: faker.number.float({
        min: 1,
        max: 5,
        fractionDigits: 1,
      }),
      sustainability: {
        carbonNeutral: faker.datatype.boolean(),
        esgScore: faker.number.float({ min: 1, max: 100, fractionDigits: 1 }),
        certifications: faker.helpers.arrayElements(
          ["B Corp", "Carbon Neutral", "LEED", "Fair Trade"],
          { min: 0, max: 3 }
        ),
      },
      logo: faker.image.url(),
      banner: faker.image.url(),
      legalStructure: faker.helpers.arrayElement([
        "Corporation",
        "LLC",
        "Partnership",
        "Sole Proprietorship",
        "Cooperative",
        "Non-Profit",
      ]),
      jurisdiction: faker.location.state(),
      incorporationDate: faker.date
        .past({ years: 50 })
        .toISOString()
        .split("T")[0],
      lastAuditDate: faker.datatype.boolean()
        ? faker.date.recent({ days: 180 }).toISOString().split("T")[0]
        : null,
      complianceStatus: faker.helpers.arrayElement([
        "Compliant",
        "Under Review",
        "Non-Compliant",
        "Exempt",
      ]),
      insurancePolicies: faker.helpers.arrayElements(
        [
          "General Liability",
          "Professional Liability",
          "Cyber Insurance",
          "D&O Insurance",
        ],
        { min: 1, max: 4 }
      ),
      bankingInfo: {
        primaryBank: faker.company.name() + " Bank",
        accountNumber: faker.finance.accountNumber(),
        routingNumber: faker.finance.routingNumber(),
        swift: faker.finance.bic(),
      },
      operatingHours: {
        weekdays: "9:00 AM - 6:00 PM",
        saturday: faker.helpers.arrayElement(["9:00 AM - 2:00 PM", "Closed"]),
        sunday: "Closed",
      },
      languages: faker.helpers.arrayElements(
        ["English", "Spanish", "French", "German", "Chinese", "Japanese"],
        { min: 1, max: 4 }
      ),
      timezone: faker.location.timeZone(),
      createdAt: faker.date.past({ years: 5 }).toISOString(),
      updatedAt: faker.date.recent({ days: 30 }).toISOString(),
    }),
  },
  department: {
    label: "Department / Division / Team",
    generator: () => ({
      id: faker.string.uuid(),
      departmentId: faker.string.alphanumeric(10).toUpperCase(),
      name: faker.helpers.arrayElement([
        "Sales",
        "Marketing",
        "Human Resources",
        "Information Technology",
        "Finance",
        "Operations",
        "Research & Development",
        "Customer Service",
        "Legal",
        "Procurement",
        "Quality Assurance",
        "Product Management",
        "Engineering",
        "Design",
        "Analytics",
      ]),
      type: faker.helpers.arrayElement([
        "Department",
        "Division",
        "Team",
        "Unit",
        "Section",
        "Branch",
      ]),
      code: faker.string.alphanumeric(6).toUpperCase(),
      description: faker.lorem.paragraph(),
      status: faker.helpers.arrayElement([
        "active",
        "inactive",
        "restructuring",
        "merging",
        "dissolving",
      ]),
      function: faker.helpers.arrayElement([
        "Core",
        "Support",
        "Strategic",
        "Operational",
        "Administrative",
      ]),
      category: faker.helpers.arrayElement([
        "Revenue",
        "Cost Center",
        "Support",
        "Overhead",
      ]),
      level: faker.helpers.arrayElement([
        "Executive",
        "Management",
        "Operational",
        "Support",
      ]),
      headOfDepartment: faker.person.fullName(),
      manager: faker.person.fullName(),
      managerEmail: faker.internet.email(),
      managerPhone: faker.phone.number(),
      employees: faker.number.int({ min: 3, max: 500 }),
      employeeIds: faker.helpers.arrayElements(
        Array.from({ length: 20 }, () => faker.string.uuid()),
        { min: 3, max: 15 }
      ),
      budget: faker.number.int({ min: 100000, max: 50000000 }),
      budgetFormatted: `$${faker.number.int({ min: 100, max: 50000 })}K`,
      budgetUtilization: faker.number.float({
        min: 50,
        max: 98,
        fractionDigits: 1,
      }),
      fiscalYear: faker.date.recent().getFullYear(),
      revenue: faker.datatype.boolean()
        ? faker.number.int({ min: 500000, max: 100000000 })
        : null,
      costs: faker.number.int({ min: 50000, max: 10000000 }),
      parentDepartment: faker.datatype.boolean()
        ? faker.commerce.department()
        : null,
      subDepartments: faker.helpers.arrayElements(
        [
          "Team A",
          "Team B",
          "Unit 1",
          "Unit 2",
          "Section Alpha",
          "Section Beta",
        ],
        { min: 0, max: 5 }
      ),
      location: {
        office: faker.helpers.arrayElement([
          "HQ",
          "North Office",
          "South Branch",
          "East Wing",
          "West Building",
        ]),
        floor: faker.number.int({ min: 1, max: 50 }),
        room: faker.datatype.boolean()
          ? `${faker.number.int({ min: 100, max: 999 })}`
          : null,
        building: faker.datatype.boolean() ? faker.lorem.words(2) : null,
        address: faker.location.streetAddress(),
        city: faker.location.city(),
      },
      phone: faker.phone.number(),
      extension: faker.string.numeric(4),
      email: faker.internet.email(),
      internalEmail: `${faker.lorem.word()}@internal.company.com`,
      established: faker.date.past({ years: 30 }).toISOString().split("T")[0],
      establishedYear: faker.date.past({ years: 30 }).getFullYear(),
      objectives: faker.helpers.arrayElements(
        [
          "Increase Revenue",
          "Improve Efficiency",
          "Reduce Costs",
          "Enhance Quality",
          "Expand Market Share",
          "Innovation",
          "Customer Satisfaction",
          "Employee Development",
        ],
        { min: 2, max: 5 }
      ),
      kpis: faker.helpers.arrayElements(
        [
          {
            metric: "Revenue Growth",
            target: `${faker.number.int({ min: 5, max: 30 })}%`,
            current: `${faker.number.int({ min: 0, max: 35 })}%`,
          },
          {
            metric: "Customer Satisfaction",
            target: "4.5/5",
            current: `${faker.number.float({
              min: 3,
              max: 5,
              fractionDigits: 1,
            })}/5`,
          },
          {
            metric: "Efficiency Rate",
            target: "95%",
            current: `${faker.number.int({ min: 80, max: 100 })}%`,
          },
        ],
        { min: 2, max: 5 }
      ),
      projects: faker.number.int({ min: 0, max: 50 }),
      activeProjects: faker.number.int({ min: 0, max: 20 }),
      completedProjects: faker.number.int({ min: 0, max: 100 }),
      tools: faker.helpers.arrayElements(
        [
          "Slack",
          "Microsoft Teams",
          "Jira",
          "Salesforce",
          "SAP",
          "Oracle",
          "Tableau",
          "Power BI",
          "Google Workspace",
          "Office 365",
          "Asana",
          "Trello",
        ],
        { min: 2, max: 8 }
      ),
      responsibilities: faker.helpers.arrayElements(
        [
          "Strategy Planning",
          "Budget Management",
          "Team Leadership",
          "Performance Analysis",
          "Process Improvement",
          "Vendor Management",
          "Risk Management",
          "Compliance",
        ],
        { min: 3, max: 6 }
      ),
      skills: faker.helpers.arrayElements(
        [
          "Leadership",
          "Project Management",
          "Data Analysis",
          "Communication",
          "Problem Solving",
          "Strategic Thinking",
          "Technical Skills",
          "Financial Analysis",
        ],
        { min: 3, max: 7 }
      ),
      certifications: faker.helpers.arrayElements(
        [
          "ISO 9001",
          "Six Sigma",
          "PMP",
          "Agile Certified",
          "ITIL",
          "Lean Manufacturing",
        ],
        { min: 0, max: 3 }
      ),
      performanceRating: faker.number.float({
        min: 1,
        max: 5,
        fractionDigits: 1,
      }),
      performancePeriod: faker.helpers.arrayElement([
        "Q1 2024",
        "Q2 2024",
        "Q3 2024",
        "Q4 2024",
        "2024",
      ]),
      turnoverRate: faker.number.float({ min: 0, max: 25, fractionDigits: 1 }),
      averageTenure: faker.number.float({ min: 1, max: 15, fractionDigits: 1 }),
      openPositions: faker.number.int({ min: 0, max: 20 }),
      collaboration: faker.helpers.arrayElements(
        ["Sales", "Marketing", "IT", "Finance", "Operations", "HR", "Legal"],
        { min: 1, max: 5 }
      ),
      meetings: {
        daily: faker.datatype.boolean(),
        weekly: faker.datatype.boolean(),
        monthly: faker.datatype.boolean(),
        allHands: faker.helpers.arrayElement([
          "Monthly",
          "Quarterly",
          "Annually",
        ]),
      },
      workModel: faker.helpers.arrayElement([
        "On-Site",
        "Remote",
        "Hybrid",
        "Flexible",
      ]),
      shiftPattern: faker.helpers.arrayElement([
        "Day Shift",
        "Night Shift",
        "Rotating",
        "Flexible",
        "24/7",
      ]),
      culture: faker.helpers.arrayElements(
        [
          "Innovative",
          "Collaborative",
          "Result-Oriented",
          "Customer-Centric",
          "Data-Driven",
          "Agile",
        ],
        { min: 2, max: 4 }
      ),
      strengths: faker.helpers.arrayElements(
        [
          "Strong Leadership",
          "Technical Expertise",
          "Customer Focus",
          "Innovation",
          "Efficiency",
          "Quality",
          "Teamwork",
          "Adaptability",
        ],
        { min: 2, max: 4 }
      ),
      challenges: faker.helpers.arrayElements(
        [
          "Resource Constraints",
          "High Workload",
          "Skill Gaps",
          "Technology Limitations",
          "Budget Restrictions",
          "Market Competition",
          "Talent Retention",
        ],
        { min: 1, max: 3 }
      ),
      initiatives: faker.helpers.arrayElements(
        [
          "Digital Transformation",
          "Process Automation",
          "Employee Training",
          "Customer Experience",
          "Cost Reduction",
          "Innovation Lab",
          "Sustainability",
        ],
        { min: 1, max: 4 }
      ),
      notes: faker.lorem.sentence(),
      tags: faker.helpers.arrayElements(
        ["core", "strategic", "support", "revenue-generating", "essential"],
        { min: 1, max: 3 }
      ),
      createdAt: faker.date.past({ years: 10 }).toISOString(),
      updatedAt: faker.date.recent({ days: 30 }).toISOString(),
      lastReview: faker.date.recent({ days: 90 }).toISOString().split("T")[0],
    }),
  },
  branch: {
    label: "Branch / Subsidiary",
    generator: () => ({
      id: faker.string.uuid(),
      branchId: faker.string.alphanumeric(10).toUpperCase(),
      name: `${faker.company.name()} ${faker.helpers.arrayElement([
        "Branch",
        "Subsidiary",
        "Division",
        "Regional Office",
        "Local Office",
      ])}`,
      type: faker.helpers.arrayElement([
        "Branch",
        "Subsidiary",
        "Division",
        "Affiliate",
        "Joint Venture",
        "Franchisee",
        "Regional Office",
      ]),
      code: faker.string.alphanumeric(6).toUpperCase(),
      legalName: `${faker.company.name()} ${faker.helpers.arrayElement([
        "Inc.",
        "LLC",
        "Ltd.",
        "Corp.",
        "S.A.",
      ])}`,
      status: faker.helpers.arrayElement([
        "active",
        "inactive",
        "opening",
        "closing",
        "acquired",
        "merged",
      ]),
      ownership: faker.helpers.arrayElement([
        "Wholly Owned",
        "Majority Owned",
        "Minority Owned",
        "Joint Venture",
        "Franchise",
        "Partnership",
      ]),
      ownershipPercentage: faker.number.float({
        min: 51,
        max: 100,
        fractionDigits: 1,
      }),
      parentCompany: faker.company.name(),
      parentCompanyId: faker.string.uuid(),
      region: faker.helpers.arrayElement([
        "North America",
        "Europe",
        "Asia Pacific",
        "Latin America",
        "Middle East",
        "Africa",
      ]),
      market: faker.helpers.arrayElement([
        "Domestic",
        "International",
        "Regional",
        "Local",
        "Global",
      ]),
      businessUnit: faker.helpers.arrayElement([
        "Retail",
        "Corporate",
        "Commercial",
        "Consumer",
        "Enterprise",
        "Government",
      ]),
      industry: faker.helpers.arrayElement([
        "Technology",
        "Healthcare",
        "Finance",
        "Manufacturing",
        "Retail",
        "Services",
      ]),
      employees: faker.number.int({ min: 5, max: 1000 }),
      manager: faker.person.fullName(),
      managerEmail: faker.internet.email(),
      managerPhone: faker.phone.number(),
      regionalManager: faker.person.fullName(),
      phone: faker.phone.number(),
      fax: faker.datatype.boolean() ? faker.phone.number() : null,
      email: faker.internet.email(),
      website: faker.datatype.boolean() ? faker.internet.url() : null,
      address: {
        street: faker.location.streetAddress(),
        city: faker.location.city(),
        state: faker.location.state(),
        zipCode: faker.location.zipCode(),
        country: faker.location.country(),
        latitude: faker.location.latitude(),
        longitude: faker.location.longitude(),
      },
      fullAddress: `${faker.location.streetAddress()}, ${faker.location.city()}, ${faker.location.state()} ${faker.location.zipCode()}, ${faker.location.country()}`,
      timezone: faker.location.timeZone(),
      established: faker.date.past({ years: 50 }).toISOString().split("T")[0],
      establishedYear: faker.date.past({ years: 50 }).getFullYear(),
      openedDate: faker.date.past({ years: 30 }).toISOString().split("T")[0],
      closedDate: faker.datatype.boolean()
        ? faker.date.past({ years: 5 }).toISOString().split("T")[0]
        : null,
      registrationNumber: faker.string.alphanumeric(12).toUpperCase(),
      taxId: faker.string.alphanumeric(11),
      vatNumber: `${faker.location.countryCode()}${faker.string.numeric(9)}`,
      licenseNumber: faker.string.alphanumeric(15).toUpperCase(),
      revenue: faker.number.int({ min: 100000, max: 100000000 }),
      revenueFormatted: `$${faker.number.float({
        min: 0.1,
        max: 100,
        fractionDigits: 1,
      })}M`,
      budget: faker.number.int({ min: 50000, max: 50000000 }),
      profitMargin: faker.number.float({ min: -5, max: 30, fractionDigits: 1 }),
      currency: faker.finance.currencyCode(),
      size: faker.number.int({ min: 500, max: 50000 }),
      sizeUnit: faker.helpers.arrayElement(["sq ft", "sq m"]),
      floors: faker.number.int({ min: 1, max: 10 }),
      departments: faker.helpers.arrayElements(
        [
          "Sales",
          "Marketing",
          "Operations",
          "HR",
          "Finance",
          "IT",
          "Customer Service",
        ],
        { min: 2, max: 6 }
      ),
      services: faker.helpers.arrayElements(
        [
          "Retail Sales",
          "Customer Support",
          "Consulting",
          "Distribution",
          "Manufacturing",
          "Warehousing",
          "Training",
          "Maintenance",
        ],
        { min: 2, max: 5 }
      ),
      products: faker.helpers.arrayElements(
        [
          faker.commerce.productName(),
          faker.commerce.productName(),
          faker.commerce.productName(),
        ],
        { min: 1, max: 8 }
      ),
      customers: faker.number.int({ min: 100, max: 100000 }),
      activeCustomers: faker.number.int({ min: 50, max: 50000 }),
      marketShare: faker.number.float({ min: 0.1, max: 35, fractionDigits: 1 }),
      competitors: faker.helpers.arrayElements(
        [faker.company.name(), faker.company.name(), faker.company.name()],
        { min: 2, max: 5 }
      ),
      facilities: faker.helpers.arrayElements(
        [
          "Office Space",
          "Retail Floor",
          "Warehouse",
          "Manufacturing Plant",
          "Distribution Center",
          "Call Center",
          "Training Center",
          "Parking",
        ],
        { min: 2, max: 6 }
      ),
      equipment: faker.helpers.arrayElements(
        [
          "POS Systems",
          "Computers",
          "Servers",
          "Manufacturing Equipment",
          "Vehicles",
          "Forklifts",
          "Inventory Systems",
          "Security Systems",
        ],
        { min: 2, max: 6 }
      ),
      operatingHours: {
        weekdays: "9:00 AM - 6:00 PM",
        saturday: faker.helpers.arrayElement([
          "9:00 AM - 5:00 PM",
          "9:00 AM - 2:00 PM",
          "Closed",
        ]),
        sunday: faker.helpers.arrayElement(["Closed", "10:00 AM - 4:00 PM"]),
      },
      performanceMetrics: {
        salesTarget: faker.number.int({ min: 100000, max: 10000000 }),
        actualSales: faker.number.int({ min: 80000, max: 12000000 }),
        customerSatisfaction: faker.number.float({
          min: 3,
          max: 5,
          fractionDigits: 1,
        }),
        employeeTurnover: faker.number.float({
          min: 0,
          max: 25,
          fractionDigits: 1,
        }),
        profitability: faker.helpers.arrayElement([
          "Profitable",
          "Break-even",
          "Loss-making",
          "High Growth",
        ]),
      },
      compliance: {
        isCompliant: faker.datatype.boolean(),
        certifications: faker.helpers.arrayElements(
          ["ISO 9001", "OSHA", "Local Business License", "Health & Safety"],
          { min: 1, max: 4 }
        ),
        lastAudit: faker.date.recent({ days: 180 }).toISOString().split("T")[0],
        nextAudit: faker.date.future({ years: 1 }).toISOString().split("T")[0],
      },
      technology: {
        erp: faker.helpers.arrayElement([
          "SAP",
          "Oracle",
          "Microsoft Dynamics",
          "NetSuite",
          "Custom",
        ]),
        crm: faker.helpers.arrayElement([
          "Salesforce",
          "HubSpot",
          "Microsoft Dynamics",
          "Zoho",
          "Custom",
        ]),
        communications: faker.helpers.arrayElements(
          [
            "Email",
            "Slack",
            "Microsoft Teams",
            "Phone System",
            "Video Conferencing",
          ],
          { min: 2, max: 5 }
        ),
        hasWebsite: faker.datatype.boolean(),
        hasEcommerce: faker.datatype.boolean(),
      },
      bankingInfo: {
        bank: faker.company.name() + " Bank",
        accountNumber: faker.finance.accountNumber(),
        routingNumber: faker.finance.routingNumber(),
        swift: faker.datatype.boolean() ? faker.finance.bic() : null,
      },
      insurance: {
        provider: faker.company.name() + " Insurance",
        policyNumber: faker.string.alphanumeric(15).toUpperCase(),
        coverage: faker.helpers.arrayElements(
          [
            "General Liability",
            "Property",
            "Workers Compensation",
            "Business Interruption",
          ],
          { min: 2, max: 4 }
        ),
        expiryDate: faker.date.future({ years: 1 }).toISOString().split("T")[0],
      },
      ranking: faker.number.int({ min: 1, max: 100 }),
      rating: faker.number.float({ min: 1, max: 5, fractionDigits: 1 }),
      reviews: faker.number.int({ min: 0, max: 5000 }),
      awards: faker.helpers.arrayElements(
        [
          "Best Branch Award",
          "Excellence in Service",
          "Top Performer",
          "Growth Award",
        ],
        { min: 0, max: 3 }
      ),
      challenges: faker.helpers.arrayElements(
        [
          "Market Competition",
          "Talent Acquisition",
          "Supply Chain",
          "Technology Upgrade",
          "Regulatory Changes",
        ],
        { min: 1, max: 3 }
      ),
      opportunities: faker.helpers.arrayElements(
        [
          "Market Expansion",
          "New Products",
          "Digital Transformation",
          "Partnership",
          "Cost Optimization",
        ],
        { min: 1, max: 3 }
      ),
      socialMedia: {
        facebook: faker.datatype.boolean() ? faker.internet.url() : null,
        instagram: faker.datatype.boolean()
          ? `@${faker.internet.username()}`
          : null,
        twitter: faker.datatype.boolean()
          ? `@${faker.internet.username()}`
          : null,
        linkedin: faker.datatype.boolean() ? faker.internet.url() : null,
      },
      isProfitable: faker.datatype.boolean(),
      isStrategic: faker.datatype.boolean(),
      isHeadquarters: faker.datatype.boolean(),
      hasParking: faker.datatype.boolean(),
      parkingSpaces: faker.datatype.boolean()
        ? faker.number.int({ min: 10, max: 500 })
        : null,
      accessibility: faker.datatype.boolean(),
      languages: faker.helpers.arrayElements(
        ["English", "Spanish", "French", "German", "Chinese", "Japanese"],
        { min: 1, max: 3 }
      ),
      notes: faker.lorem.sentence(),
      tags: faker.helpers.arrayElements(
        ["flagship", "regional", "strategic", "high-performing", "growth"],
        { min: 1, max: 3 }
      ),
      createdAt: faker.date.past({ years: 10 }).toISOString(),
      updatedAt: faker.date.recent({ days: 30 }).toISOString(),
      lastInspection: faker.date
        .recent({ days: 90 })
        .toISOString()
        .split("T")[0],
    }),
  },
  group: {
    label: "Group / Membership / Affiliation",
    generator: () => ({
      id: faker.string.uuid(),
      groupId: faker.string.alphanumeric(10).toUpperCase(),
      name: faker.helpers.arrayElement([
        `${faker.lorem.words(2)} Group`,
        `${faker.lorem.words(2)} Association`,
        `${faker.lorem.words(2)} Club`,
        `${faker.lorem.words(2)} Organization`,
        `${faker.lorem.words(2)} Society`,
        `${faker.lorem.words(2)} Alliance`,
      ]),
      type: faker.helpers.arrayElement([
        "Group",
        "Association",
        "Club",
        "Organization",
        "Society",
        "Alliance",
        "Union",
        "Community",
        "Network",
        "Coalition",
      ]),
      category: faker.helpers.arrayElement([
        "Professional",
        "Social",
        "Academic",
        "Religious",
        "Political",
        "Sports",
        "Hobby",
        "Charitable",
        "Business",
        "Cultural",
      ]),
      status: faker.helpers.arrayElement([
        "active",
        "inactive",
        "pending",
        "suspended",
        "dissolved",
      ]),
      visibility: faker.helpers.arrayElement([
        "public",
        "private",
        "invite-only",
        "members-only",
      ]),
      description: faker.lorem.paragraph(),
      purpose: faker.lorem.sentence(),
      founded: faker.date.past({ years: 30 }).toISOString().split("T")[0],
      founder: faker.person.fullName(),
      leader: faker.person.fullName(),
      leaderTitle: faker.helpers.arrayElement([
        "President",
        "Chair",
        "Director",
        "Coordinator",
        "Lead",
        "Administrator",
      ]),
      memberCount: faker.number.int({ min: 5, max: 10000 }),
      activeMembers: faker.number.int({ min: 3, max: 8000 }),
      pendingMembers: faker.number.int({ min: 0, max: 100 }),
      membershipType: faker.helpers.arrayElement([
        "Free",
        "Paid",
        "Subscription",
        "Tiered",
        "By Invitation",
      ]),
      membershipFee: faker.datatype.boolean()
        ? parseFloat(faker.commerce.price({ min: 10, max: 500 }))
        : 0,
      membershipBenefits: faker.helpers.arrayElements(
        [
          "Networking Events",
          "Exclusive Content",
          "Discounts",
          "Training",
          "Certification",
          "Newsletter",
          "Job Board",
          "Mentorship",
          "Voting Rights",
          "Priority Access",
        ],
        { min: 2, max: 6 }
      ),
      requirements: faker.helpers.arrayElements(
        [
          "Application Form",
          "Background Check",
          "Interview",
          "Endorsement",
          "Skills Assessment",
          "Experience",
          "Education",
          "Fee Payment",
          "References",
        ],
        { min: 0, max: 4 }
      ),
      meetingFrequency: faker.helpers.arrayElement([
        "Weekly",
        "Bi-weekly",
        "Monthly",
        "Quarterly",
        "Annually",
        "As Needed",
      ]),
      nextMeeting: faker.date.future().toISOString().split("T")[0],
      location: faker.location.city(),
      address: faker.datatype.boolean()
        ? {
            street: faker.location.streetAddress(),
            city: faker.location.city(),
            state: faker.location.state(),
            zipCode: faker.location.zipCode(),
            country: faker.location.country(),
          }
        : null,
      website: faker.datatype.boolean() ? faker.internet.url() : null,
      email: faker.internet.email(),
      phone: faker.datatype.boolean() ? faker.phone.number() : null,
      socialMedia: {
        facebook: faker.datatype.boolean() ? faker.internet.url() : null,
        twitter: faker.datatype.boolean()
          ? `@${faker.internet.username()}`
          : null,
        linkedin: faker.datatype.boolean() ? faker.internet.url() : null,
        instagram: faker.datatype.boolean()
          ? `@${faker.internet.username()}`
          : null,
      },
      committees: faker.helpers.arrayElements(
        [
          "Membership",
          "Events",
          "Finance",
          "Communications",
          "Governance",
          "Programs",
          "Outreach",
        ],
        { min: 0, max: 5 }
      ),
      activities: faker.helpers.arrayElements(
        [
          "Networking Events",
          "Workshops",
          "Conferences",
          "Training Sessions",
          "Social Gatherings",
          "Volunteer Projects",
          "Fundraisers",
          "Competitions",
          "Publications",
          "Research",
        ],
        { min: 2, max: 7 }
      ),
      partnerships: faker.helpers.arrayElements(
        [faker.company.name(), faker.company.name()],
        { min: 0, max: 4 }
      ),
      achievements: faker.helpers.arrayElements(
        [
          "Award Winner",
          "Community Impact",
          "Growth Milestone",
          "Innovation Leader",
          "Industry Recognition",
        ],
        { min: 0, max: 3 }
      ),
      budget: faker.number.int({ min: 1000, max: 1000000 }),
      budgetYear: new Date().getFullYear(),
      taxStatus: faker.helpers.arrayElement([
        "Non-Profit",
        "For-Profit",
        "Tax-Exempt",
        "Charitable",
      ]),
      registrationNumber: faker.string.alphanumeric(12).toUpperCase(),
      isVerified: faker.datatype.boolean(),
      tags: faker.helpers.arrayElements(
        [
          "community",
          "professional",
          "networking",
          "educational",
          "charitable",
        ],
        { min: 1, max: 4 }
      ),
      notes: faker.lorem.sentence(),
      createdAt: faker.date.past({ years: 10 }).toISOString(),
      updatedAt: faker.date.recent({ days: 30 }).toISOString(),
    }),
  },
  network: {
    label: "Contact List / Network",
    generator: () => ({
      id: faker.string.uuid(),
      networkId: faker.string.alphanumeric(12).toUpperCase(),
      name: faker.helpers.arrayElement([
        `${faker.person.fullName()}'s Network`,
        `${faker.lorem.words(2)} Network`,
        `${faker.lorem.words(2)} Contacts`,
        `${faker.company.name()} Network`,
      ]),
      type: faker.helpers.arrayElement([
        "Contact List",
        "Professional Network",
        "Social Network",
        "Business Network",
        "Personal Network",
        "Family Network",
      ]),
      ownerId: faker.string.uuid(),
      ownerName: faker.person.fullName(),
      ownerEmail: faker.internet.email(),
      visibility: faker.helpers.arrayElement([
        "private",
        "connections-only",
        "public",
        "limited",
      ]),
      status: faker.helpers.arrayElement([
        "active",
        "inactive",
        "archived",
        "syncing",
      ]),
      description: faker.lorem.sentence(),
      totalContacts: faker.number.int({ min: 5, max: 5000 }),
      activeContacts: faker.number.int({ min: 3, max: 4000 }),
      connectionLevel: faker.helpers.arrayElement([
        "1st Degree",
        "2nd Degree",
        "3rd Degree",
        "Direct",
        "Extended",
      ]),
      categories: faker.helpers.arrayElements(
        [
          "Family",
          "Friends",
          "Colleagues",
          "Clients",
          "Vendors",
          "Partners",
          "Alumni",
          "Industry Contacts",
          "Mentors",
          "Mentees",
          "Professional",
          "Personal",
        ],
        { min: 2, max: 6 }
      ),
      tags: faker.helpers.arrayElements(
        [
          "important",
          "frequent",
          "vip",
          "archived",
          "new",
          "verified",
          "starred",
        ],
        { min: 1, max: 4 }
      ),
      contacts: faker.helpers.arrayElements(
        [
          {
            id: faker.string.uuid(),
            name: faker.person.fullName(),
            email: faker.internet.email(),
            phone: faker.phone.number(),
            company: faker.company.name(),
            position: faker.person.jobTitle(),
            relationship: faker.helpers.arrayElement([
              "Friend",
              "Colleague",
              "Client",
              "Vendor",
              "Partner",
              "Family",
            ]),
            connectedSince: faker.date
              .past({ years: 5 })
              .toISOString()
              .split("T")[0],
            lastContact: faker.date
              .recent({ days: 90 })
              .toISOString()
              .split("T")[0],
            notes: faker.lorem.sentence(),
          },
        ],
        { min: 3, max: 20 }
      ),
      source: faker.helpers.arrayElement([
        "Manual Entry",
        "Import",
        "LinkedIn",
        "Email",
        "Business Card",
        "Event",
        "Referral",
        "Social Media",
      ]),
      importedFrom: faker.datatype.boolean()
        ? faker.helpers.arrayElement([
            "LinkedIn",
            "Gmail",
            "Outlook",
            "Salesforce",
            "Excel",
            "CSV",
          ])
        : null,
      lastSync: faker.datatype.boolean()
        ? faker.date.recent({ days: 7 }).toISOString()
        : null,
      autoSync: faker.datatype.boolean(),
      syncFrequency: faker.helpers.arrayElement([
        "Daily",
        "Weekly",
        "Monthly",
        "Manual",
        "Real-time",
      ]),
      sharedWith: faker.helpers.arrayElements(
        [
          {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            permission: faker.helpers.arrayElement(["View", "Edit", "Admin"]),
          },
        ],
        { min: 0, max: 5 }
      ),
      permissions: {
        canView: faker.datatype.boolean(),
        canEdit: faker.datatype.boolean(),
        canShare: faker.datatype.boolean(),
        canExport: faker.datatype.boolean(),
        canDelete: faker.datatype.boolean(),
      },
      industries: faker.helpers.arrayElements(
        [
          "Technology",
          "Healthcare",
          "Finance",
          "Education",
          "Manufacturing",
          "Retail",
          "Consulting",
        ],
        { min: 1, max: 5 }
      ),
      locations: faker.helpers.arrayElements(
        [faker.location.city(), faker.location.city(), faker.location.city()],
        { min: 1, max: 8 }
      ),
      interactionFrequency: faker.helpers.arrayElement([
        "Daily",
        "Weekly",
        "Monthly",
        "Quarterly",
        "Rarely",
        "Never",
      ]),
      lastInteraction: faker.date.recent({ days: 30 }).toISOString(),
      upcomingFollowUps: faker.number.int({ min: 0, max: 50 }),
      notes: faker.lorem.paragraph(),
      statistics: {
        totalInteractions: faker.number.int({ min: 0, max: 1000 }),
        emailsSent: faker.number.int({ min: 0, max: 500 }),
        meetingsHeld: faker.number.int({ min: 0, max: 200 }),
        callsMade: faker.number.int({ min: 0, max: 300 }),
        averageResponseTime: `${faker.number.int({ min: 1, max: 48 })} hours`,
      },
      duplicates: faker.number.int({ min: 0, max: 10 }),
      needsUpdate: faker.number.int({ min: 0, max: 20 }),
      incomplete: faker.number.int({ min: 0, max: 30 }),
      createdAt: faker.date.past({ years: 5 }).toISOString(),
      updatedAt: faker.date.recent({ days: 7 }).toISOString(),
      lastBackup: faker.date.recent({ days: 30 }).toISOString(),
    }),
  },
  hierarchy: {
    label: "Parent / Child (Category, Subcategory)",
    generator: () => ({
      id: faker.string.uuid(),
      hierarchyId: faker.string.alphanumeric(10).toUpperCase(),
      name: faker.lorem.words({ min: 2, max: 4 }),
      type: faker.helpers.arrayElement([
        "Category",
        "Subcategory",
        "Classification",
        "Taxonomy",
        "Organizational Unit",
        "Department",
        "Division",
      ]),
      level: faker.number.int({ min: 1, max: 5 }),
      levelName: faker.helpers.arrayElement([
        "Root",
        "Parent",
        "Child",
        "Grandchild",
        "Leaf",
      ]),
      path: `/${faker.lorem.word()}/${faker.lorem.word()}/${faker.lorem.word()}`,
      parentId: faker.datatype.boolean() ? faker.string.uuid() : null,
      parentName: faker.datatype.boolean()
        ? faker.lorem.words({ min: 2, max: 4 })
        : null,
      hasChildren: faker.datatype.boolean(),
      childrenCount: faker.number.int({ min: 0, max: 50 }),
      children: faker.helpers.arrayElements(
        [
          {
            id: faker.string.uuid(),
            name: faker.lorem.words(3),
            order: faker.number.int({ min: 1, max: 20 }),
          },
        ],
        { min: 0, max: 8 }
      ),
      ancestors: faker.helpers.arrayElements(
        [
          {
            id: faker.string.uuid(),
            name: faker.lorem.words(2),
            level: faker.number.int({ min: 1, max: 3 }),
          },
        ],
        { min: 0, max: 4 }
      ),
      descendants: faker.number.int({ min: 0, max: 200 }),
      siblings: faker.number.int({ min: 0, max: 20 }),
      order: faker.number.int({ min: 1, max: 100 }),
      displayOrder: faker.number.int({ min: 1, max: 100 }),
      isRoot: faker.datatype.boolean(),
      isLeaf: faker.datatype.boolean(),
      depth: faker.number.int({ min: 0, max: 5 }),
      breadcrumb: faker.helpers
        .arrayElements(
          [faker.lorem.word(), faker.lorem.word(), faker.lorem.word()],
          { min: 1, max: 5 }
        )
        .join(" > "),
      slug: faker.lorem.slug(),
      code: faker.string.alphanumeric(8).toUpperCase(),
      externalId: faker.datatype.boolean()
        ? faker.string.alphanumeric(15)
        : null,
      status: faker.helpers.arrayElement([
        "active",
        "inactive",
        "archived",
        "draft",
        "deprecated",
      ]),
      visibility: faker.helpers.arrayElement([
        "public",
        "private",
        "internal",
        "restricted",
      ]),
      description: faker.lorem.sentence(),
      longDescription: faker.lorem.paragraph(),
      icon: faker.datatype.boolean()
        ? faker.helpers.arrayElement(["📁", "📂", "📄", "🏷️", "📦", "🔖"])
        : null,
      iconUrl: faker.datatype.boolean() ? faker.image.url() : null,
      color: faker.datatype.boolean() ? faker.color.rgb() : null,
      metadata: {
        keywords: faker.helpers.arrayElements(
          faker.lorem.words(10).split(" "),
          { min: 2, max: 6 }
        ),
        seoTitle: faker.lorem.words({ min: 3, max: 8 }),
        seoDescription: faker.lorem.sentence(),
        customFields: {
          field1: faker.lorem.word(),
          field2: faker.number.int({ min: 1, max: 100 }),
        },
      },
      itemCount: faker.number.int({ min: 0, max: 10000 }),
      activeItemCount: faker.number.int({ min: 0, max: 8000 }),
      weight: faker.number.float({ min: 0, max: 100, fractionDigits: 2 }),
      priority: faker.helpers.arrayElement([
        "low",
        "medium",
        "high",
        "critical",
      ]),
      permissions: {
        canView: faker.datatype.boolean(),
        canEdit: faker.datatype.boolean(),
        canDelete: faker.datatype.boolean(),
        canManageChildren: faker.datatype.boolean(),
      },
      owner: faker.person.fullName(),
      ownerId: faker.string.uuid(),
      createdBy: faker.person.fullName(),
      updatedBy: faker.person.fullName(),
      tags: faker.helpers.arrayElements(
        ["important", "featured", "new", "popular", "archived"],
        { min: 0, max: 4 }
      ),
      attributes: faker.helpers.arrayElements(
        [
          { key: "attribute1", value: faker.lorem.word() },
          { key: "attribute2", value: faker.lorem.word() },
        ],
        { min: 0, max: 5 }
      ),
      rules: faker.helpers.arrayElements(
        [
          "Auto-categorize items",
          "Inherit parent properties",
          "Require approval",
          "Limit visibility",
        ],
        { min: 0, max: 3 }
      ),
      inheritFromParent: faker.datatype.boolean(),
      overrideParent: faker.datatype.boolean(),
      isSystem: faker.datatype.boolean(),
      isLocked: faker.datatype.boolean(),
      lockedBy: faker.datatype.boolean() ? faker.person.fullName() : null,
      lockedAt: faker.datatype.boolean()
        ? faker.date.recent({ days: 7 }).toISOString()
        : null,
      version: faker.number.int({ min: 1, max: 10 }),
      versionHistory: faker.number.int({ min: 0, max: 50 }),
      lastModifiedField: faker.helpers.arrayElement([
        "name",
        "description",
        "order",
        "parent",
        "status",
      ]),
      changeFrequency: faker.helpers.arrayElement([
        "rarely",
        "occasionally",
        "frequently",
        "constantly",
      ]),
      notes: faker.lorem.sentence(),
      createdAt: faker.date.past({ years: 5 }).toISOString(),
      updatedAt: faker.date.recent({ days: 30 }).toISOString(),
      archivedAt: faker.datatype.boolean()
        ? faker.date.past().toISOString()
        : null,
    }),
  },
  family: {
    label: "Family / Household",
    generator: () => ({
      id: faker.string.uuid(),
      familyId: faker.string.alphanumeric(10).toUpperCase(),
      householdName:
        faker.person.lastName() +
        " " +
        faker.helpers.arrayElement(["Family", "Household", "Home"]),
      type: faker.helpers.arrayElement([
        "Nuclear Family",
        "Extended Family",
        "Single Parent",
        "Blended Family",
        "Multigenerational",
        "Household",
      ]),
      status: faker.helpers.arrayElement([
        "active",
        "inactive",
        "relocated",
        "separated",
        "merged",
      ]),
      headOfHousehold: faker.person.fullName(),
      primaryContact: faker.person.fullName(),
      primaryContactId: faker.string.uuid(),
      secondaryContact: faker.datatype.boolean()
        ? faker.person.fullName()
        : null,
      memberCount: faker.number.int({ min: 1, max: 15 }),
      adults: faker.number.int({ min: 1, max: 8 }),
      children: faker.number.int({ min: 0, max: 10 }),
      dependents: faker.number.int({ min: 0, max: 8 }),
      members: faker.helpers.arrayElements(
        [
          {
            id: faker.string.uuid(),
            name: faker.person.fullName(),
            relationship: faker.helpers.arrayElement([
              "Parent",
              "Child",
              "Spouse",
              "Sibling",
              "Grandparent",
              "Grandchild",
              "Uncle",
              "Aunt",
              "Cousin",
              "Other",
            ]),
            gender: faker.person.sex(),
            dateOfBirth: faker.date
              .birthdate({ min: 0, max: 90, mode: "age" })
              .toISOString()
              .split("T")[0],
            age: faker.number.int({ min: 0, max: 90 }),
            occupation: faker.datatype.boolean()
              ? faker.person.jobTitle()
              : "Not Applicable",
            isDependent: faker.datatype.boolean(),
            isPrimaryContact: faker.datatype.boolean(),
            email: faker.datatype.boolean() ? faker.internet.email() : null,
            phone: faker.datatype.boolean() ? faker.phone.number() : null,
          },
        ],
        { min: 2, max: 10 }
      ),
      address: {
        street: faker.location.streetAddress(),
        city: faker.location.city(),
        state: faker.location.state(),
        zipCode: faker.location.zipCode(),
        country: faker.location.country(),
        residenceType: faker.helpers.arrayElement([
          "House",
          "Apartment",
          "Condo",
          "Townhouse",
          "Mobile Home",
        ]),
        ownership: faker.helpers.arrayElement([
          "Owned",
          "Rented",
          "Leased",
          "Family-Owned",
        ]),
      },
      mailingAddress: faker.datatype.boolean()
        ? {
            street: faker.location.streetAddress(),
            city: faker.location.city(),
            state: faker.location.state(),
            zipCode: faker.location.zipCode(),
            country: faker.location.country(),
          }
        : null,
      phone: faker.phone.number(),
      alternatePhone: faker.datatype.boolean() ? faker.phone.number() : null,
      email: faker.internet.email(),
      emergencyContact: {
        name: faker.person.fullName(),
        relationship: faker.helpers.arrayElement([
          "Friend",
          "Relative",
          "Neighbor",
          "Colleague",
        ]),
        phone: faker.phone.number(),
        email: faker.internet.email(),
      },
      preferredContactMethod: faker.helpers.arrayElement([
        "Phone",
        "Email",
        "Text",
        "Mail",
        "In-Person",
      ]),
      language: faker.helpers.arrayElements(
        ["English", "Spanish", "French", "Chinese", "Arabic"],
        { min: 1, max: 2 }
      ),
      ethnicity: faker.datatype.boolean()
        ? faker.helpers.arrayElement([
            "Asian",
            "Black",
            "Hispanic",
            "White",
            "Pacific Islander",
            "Native American",
            "Mixed",
            "Other",
          ])
        : null,
      religion: faker.datatype.boolean()
        ? faker.helpers.arrayElement([
            "Christianity",
            "Islam",
            "Hinduism",
            "Buddhism",
            "Judaism",
            "Other",
            "None",
          ])
        : null,
      combinedAnnualIncome: faker.number.int({ min: 20000, max: 500000 }),
      incomeRange: faker.helpers.arrayElement([
        "< $25k",
        "$25k-$50k",
        "$50k-$75k",
        "$75k-$100k",
        "$100k-$150k",
        "$150k-$250k",
        "> $250k",
      ]),
      employmentStatus: faker.helpers.arrayElements(
        ["Employed", "Unemployed", "Self-Employed", "Retired", "Student"],
        { min: 1, max: 3 }
      ),
      educationLevel: faker.helpers.arrayElement([
        "High School",
        "Some College",
        "Bachelor's",
        "Master's",
        "Doctorate",
        "Mixed",
      ]),
      pets: faker.helpers.arrayElements(
        [
          {
            type: faker.helpers.arrayElement([
              "Dog",
              "Cat",
              "Bird",
              "Fish",
              "Rabbit",
              "Other",
            ]),
            name: faker.person.firstName(),
            age: faker.number.int({ min: 1, max: 15 }),
          },
        ],
        { min: 0, max: 4 }
      ),
      vehicles: faker.number.int({ min: 0, max: 5 }),
      insuranceProvider: faker.datatype.boolean()
        ? faker.company.name() + " Insurance"
        : null,
      insurancePolicyNumber: faker.datatype.boolean()
        ? faker.string.alphanumeric(15).toUpperCase()
        : null,
      medicalProvider: faker.datatype.boolean()
        ? faker.company.name() + " Healthcare"
        : null,
      specialNeeds: faker.helpers.arrayElements(
        [
          "Wheelchair Access",
          "Dietary Restrictions",
          "Medical Care",
          "Educational Support",
          "Language Assistance",
        ],
        { min: 0, max: 3 }
      ),
      interests: faker.helpers.arrayElements(
        [
          "Sports",
          "Arts",
          "Music",
          "Travel",
          "Cooking",
          "Reading",
          "Gaming",
          "Outdoor Activities",
          "Technology",
        ],
        { min: 2, max: 6 }
      ),
      memberSince: faker.date.past({ years: 20 }).toISOString().split("T")[0],
      lastUpdated: faker.date.recent({ days: 90 }).toISOString().split("T")[0],
      lastContact: faker.date.recent({ days: 30 }).toISOString().split("T")[0],
      notes: faker.lorem.paragraph(),
      tags: faker.helpers.arrayElements(
        ["active", "vip", "long-term", "new", "needs-follow-up"],
        { min: 1, max: 3 }
      ),
      privacyConsent: faker.datatype.boolean(),
      consentDate: faker.datatype.boolean()
        ? faker.date.recent({ days: 365 }).toISOString().split("T")[0]
        : null,
      dataSharing: faker.helpers.arrayElement(["Full", "Limited", "None"]),
      reminderPreferences: {
        birthdays: faker.datatype.boolean(),
        anniversaries: faker.datatype.boolean(),
        events: faker.datatype.boolean(),
        holidays: faker.datatype.boolean(),
      },
      importantDates: faker.helpers.arrayElements(
        [
          {
            name: "Anniversary",
            date: faker.date.future().toISOString().split("T")[0],
          },
          {
            name: "Birthday",
            date: faker.date.birthdate().toISOString().split("T")[0],
          },
        ],
        { min: 0, max: 5 }
      ),
      affiliations: faker.helpers.arrayElements(
        [
          "School",
          "Church",
          "Community Center",
          "Sports Club",
          "Social Organization",
        ],
        { min: 0, max: 4 }
      ),
      createdAt: faker.date.past({ years: 10 }).toISOString(),
      updatedAt: faker.date.recent({ days: 30 }).toISOString(),
    }),
  },
  message: {
    label: "Message / Chat / Email / SMS",
    generator: () => ({
      id: faker.string.uuid(),
      messageId: faker.string.alphanumeric(16).toUpperCase(),
      type: faker.helpers.arrayElement([
        "email",
        "chat",
        "sms",
        "mms",
        "direct-message",
        "group-message",
        "system-message",
      ]),
      platform: faker.helpers.arrayElement([
        "Email",
        "Slack",
        "Teams",
        "WhatsApp",
        "SMS",
        "Telegram",
        "Discord",
        "In-App Chat",
      ]),
      status: faker.helpers.arrayElement([
        "sent",
        "delivered",
        "read",
        "pending",
        "failed",
        "draft",
        "scheduled",
        "archived",
      ]),
      subject: faker.datatype.boolean()
        ? faker.lorem.words({ min: 3, max: 8 })
        : null,
      body: faker.lorem.paragraph({ min: 1, max: 3 }),
      plainText: faker.lorem.paragraph(),
      html: faker.datatype.boolean()
        ? `<p>${faker.lorem.paragraph()}</p>`
        : null,
      senderId: faker.string.uuid(),
      senderName: faker.person.fullName(),
      senderEmail: faker.internet.email(),
      senderPhone: faker.datatype.boolean() ? faker.phone.number() : null,
      senderAvatar: faker.image.avatar(),
      recipientId: faker.string.uuid(),
      recipientName: faker.person.fullName(),
      recipientEmail: faker.internet.email(),
      recipientPhone: faker.datatype.boolean() ? faker.phone.number() : null,
      recipientType: faker.helpers.arrayElement([
        "individual",
        "group",
        "broadcast",
        "channel",
      ]),
      recipients: faker.helpers.arrayElements(
        [
          {
            id: faker.string.uuid(),
            name: faker.person.fullName(),
            email: faker.internet.email(),
            type: "to",
          },
          {
            id: faker.string.uuid(),
            name: faker.person.fullName(),
            email: faker.internet.email(),
            type: "cc",
          },
          {
            id: faker.string.uuid(),
            name: faker.person.fullName(),
            email: faker.internet.email(),
            type: "bcc",
          },
        ],
        { min: 1, max: 8 }
      ),
      cc: faker.helpers.arrayElements([faker.internet.email()], {
        min: 0,
        max: 3,
      }),
      bcc: faker.helpers.arrayElements([faker.internet.email()], {
        min: 0,
        max: 3,
      }),
      replyTo: faker.datatype.boolean() ? faker.internet.email() : null,
      inReplyTo: faker.datatype.boolean()
        ? faker.string.alphanumeric(16).toUpperCase()
        : null,
      threadId: faker.datatype.boolean()
        ? faker.string.alphanumeric(12).toUpperCase()
        : null,
      conversationId: faker.string.alphanumeric(12).toUpperCase(),
      isThread: faker.datatype.boolean(),
      threadPosition: faker.datatype.boolean()
        ? faker.number.int({ min: 1, max: 20 })
        : null,
      hasAttachments: faker.datatype.boolean(),
      attachments: faker.helpers.arrayElements(
        [
          {
            id: faker.string.uuid(),
            name: `${faker.system.fileName()}.${faker.helpers.arrayElement([
              "pdf",
              "jpg",
              "png",
              "docx",
              "xlsx",
            ])}`,
            type: faker.system.mimeType(),
            size: faker.number.int({ min: 1024, max: 10485760 }),
            sizeFormatted: `${faker.number.float({
              min: 0.1,
              max: 10,
              fractionDigits: 1,
            })} MB`,
            url: faker.internet.url(),
          },
        ],
        { min: 0, max: 5 }
      ),
      priority: faker.helpers.arrayElement(["low", "normal", "high", "urgent"]),
      importance: faker.helpers.arrayElement(["low", "normal", "high"]),
      isEncrypted: faker.datatype.boolean(),
      encryption: faker.datatype.boolean()
        ? faker.helpers.arrayElement(["TLS", "End-to-End", "PGP", "S/MIME"])
        : null,
      sentAt: faker.date.recent({ days: 30 }).toISOString(),
      deliveredAt: faker.datatype.boolean()
        ? faker.date.recent({ days: 29 }).toISOString()
        : null,
      readAt: faker.datatype.boolean()
        ? faker.date.recent({ days: 28 }).toISOString()
        : null,
      scheduledFor: faker.datatype.boolean()
        ? faker.date.future().toISOString()
        : null,
      expiresAt: faker.datatype.boolean()
        ? faker.date.future().toISOString()
        : null,
      isStarred: faker.datatype.boolean(),
      isFlagged: faker.datatype.boolean(),
      isArchived: faker.datatype.boolean(),
      isSpam: faker.datatype.boolean(),
      isDeleted: faker.datatype.boolean(),
      deletedAt: faker.datatype.boolean()
        ? faker.date.recent({ days: 7 }).toISOString()
        : null,
      folder: faker.helpers.arrayElement([
        "Inbox",
        "Sent",
        "Drafts",
        "Archive",
        "Spam",
        "Trash",
        "Important",
      ]),
      labels: faker.helpers.arrayElements(
        ["work", "personal", "important", "follow-up", "urgent", "project"],
        { min: 0, max: 4 }
      ),
      tags: faker.helpers.arrayElements(
        ["client", "internal", "external", "automated", "newsletter"],
        { min: 0, max: 3 }
      ),
      category: faker.helpers.arrayElement([
        "Primary",
        "Social",
        "Promotions",
        "Updates",
        "Forums",
        "Personal",
        "Work",
      ]),
      autoReply: faker.datatype.boolean(),
      readReceipt: faker.datatype.boolean(),
      deliveryReceipt: faker.datatype.boolean(),
      trackingEnabled: faker.datatype.boolean(),
      opens: faker.number.int({ min: 0, max: 50 }),
      clicks: faker.number.int({ min: 0, max: 20 }),
      bounced: faker.datatype.boolean(),
      bounceReason: faker.datatype.boolean()
        ? faker.helpers.arrayElement([
            "Invalid Email",
            "Mailbox Full",
            "Server Error",
            "Blocked",
          ])
        : null,
      sentiment: faker.helpers.arrayElement([
        "positive",
        "neutral",
        "negative",
        "mixed",
      ]),
      language: faker.helpers.arrayElement([
        "English",
        "Spanish",
        "French",
        "German",
        "Chinese",
      ]),
      characterCount: faker.number.int({ min: 50, max: 5000 }),
      wordCount: faker.number.int({ min: 10, max: 1000 }),
      metadata: {
        userAgent: faker.internet.userAgent(),
        ipAddress: faker.internet.ip(),
        device: faker.helpers.arrayElement(["Desktop", "Mobile", "Tablet"]),
        location: faker.location.city(),
        timezone: faker.location.timeZone(),
      },
      references: faker.helpers.arrayElements([faker.string.alphanumeric(16)], {
        min: 0,
        max: 3,
      }),
      forwardedFrom: faker.datatype.boolean() ? faker.internet.email() : null,
      isForwarded: faker.datatype.boolean(),
      isAutoGenerated: faker.datatype.boolean(),
      source: faker.helpers.arrayElement([
        "Manual",
        "API",
        "Automated",
        "Scheduled",
        "Triggered",
      ]),
      campaign: faker.datatype.boolean() ? faker.lorem.words(3) : null,
      campaignId: faker.datatype.boolean() ? faker.string.uuid() : null,
      notes: faker.datatype.boolean() ? faker.lorem.sentence() : null,
      createdAt: faker.date.past({ years: 1 }).toISOString(),
      updatedAt: faker.date.recent({ days: 15 }).toISOString(),
    }),
  },
  comment: {
    label: "Comment / Review / Feedback",
    generator: () => ({
      id: faker.string.uuid(),
      commentId: faker.string.alphanumeric(12).toUpperCase(),
      type: faker.helpers.arrayElement([
        "comment",
        "review",
        "feedback",
        "testimonial",
        "reply",
        "note",
      ]),
      status: faker.helpers.arrayElement([
        "published",
        "pending",
        "approved",
        "rejected",
        "spam",
        "archived",
        "flagged",
      ]),
      content: faker.lorem.paragraph({ min: 1, max: 3 }),
      plainText: faker.lorem.paragraph(),
      html: faker.datatype.boolean()
        ? `<p>${faker.lorem.paragraph()}</p>`
        : null,
      title: faker.datatype.boolean()
        ? faker.lorem.words({ min: 3, max: 8 })
        : null,
      rating: faker.datatype.boolean()
        ? faker.number.float({ min: 1, max: 5, fractionDigits: 1 })
        : null,
      ratingScale: faker.helpers.arrayElement([
        "1-5 stars",
        "1-10",
        "thumbs up/down",
        "emoji",
      ]),
      authorId: faker.string.uuid(),
      authorName: faker.person.fullName(),
      authorEmail: faker.internet.email(),
      authorAvatar: faker.image.avatar(),
      authorRole: faker.helpers.arrayElement([
        "Customer",
        "User",
        "Member",
        "Guest",
        "Verified Purchaser",
        "Admin",
        "Moderator",
      ]),
      isVerifiedPurchase: faker.datatype.boolean(),
      isVerifiedUser: faker.datatype.boolean(),
      targetId: faker.string.uuid(),
      targetType: faker.helpers.arrayElement([
        "product",
        "article",
        "post",
        "video",
        "course",
        "service",
        "user",
        "company",
        "event",
      ]),
      targetTitle: faker.lorem.words({ min: 3, max: 6 }),
      parentId: faker.datatype.boolean() ? faker.string.uuid() : null,
      parentType: faker.datatype.boolean()
        ? faker.helpers.arrayElement(["comment", "review", "post"])
        : null,
      isReply: faker.datatype.boolean(),
      replyTo: faker.datatype.boolean() ? faker.person.fullName() : null,
      replyToId: faker.datatype.boolean() ? faker.string.uuid() : null,
      threadId: faker.datatype.boolean()
        ? faker.string.alphanumeric(12).toUpperCase()
        : null,
      threadDepth: faker.number.int({ min: 0, max: 5 }),
      hasReplies: faker.datatype.boolean(),
      replyCount: faker.number.int({ min: 0, max: 100 }),
      sentiment: faker.helpers.arrayElement([
        "positive",
        "neutral",
        "negative",
        "mixed",
      ]),
      tone: faker.helpers.arrayElement([
        "professional",
        "casual",
        "formal",
        "friendly",
        "critical",
        "enthusiastic",
      ]),
      language: faker.helpers.arrayElement([
        "English",
        "Spanish",
        "French",
        "German",
        "Chinese",
      ]),
      isEdited: faker.datatype.boolean(),
      editedAt: faker.datatype.boolean()
        ? faker.date.recent({ days: 7 }).toISOString()
        : null,
      editHistory: faker.number.int({ min: 0, max: 5 }),
      upvotes: faker.number.int({ min: 0, max: 1000 }),
      downvotes: faker.number.int({ min: 0, max: 100 }),
      likes: faker.number.int({ min: 0, max: 5000 }),
      dislikes: faker.number.int({ min: 0, max: 200 }),
      helpfulCount: faker.number.int({ min: 0, max: 500 }),
      notHelpfulCount: faker.number.int({ min: 0, max: 50 }),
      score: faker.number.int({ min: -100, max: 1000 }),
      voteRatio: faker.number.float({ min: 0, max: 1, fractionDigits: 2 }),
      isFeatured: faker.datatype.boolean(),
      isPinned: faker.datatype.boolean(),
      isHighlighted: faker.datatype.boolean(),
      isRecommended: faker.datatype.boolean(),
      visibility: faker.helpers.arrayElement([
        "public",
        "private",
        "followers-only",
        "members-only",
        "hidden",
      ]),
      hasAttachments: faker.datatype.boolean(),
      attachments: faker.helpers.arrayElements(
        [
          {
            id: faker.string.uuid(),
            type: faker.helpers.arrayElement([
              "image",
              "video",
              "document",
              "link",
            ]),
            url: faker.internet.url(),
            thumbnail: faker.image.url(),
          },
        ],
        { min: 0, max: 5 }
      ),
      images: faker.helpers.arrayElements([faker.image.url()], {
        min: 0,
        max: 10,
      }),
      videos: faker.helpers.arrayElements([faker.internet.url()], {
        min: 0,
        max: 3,
      }),
      mentions: faker.helpers.arrayElements(
        [
          {
            id: faker.string.uuid(),
            username: `@${faker.internet.username()}`,
            name: faker.person.fullName(),
          },
        ],
        { min: 0, max: 5 }
      ),
      hashtags: faker.helpers.arrayElements(
        [
          `#${faker.lorem.word()}`,
          `#${faker.lorem.word()}`,
          `#${faker.lorem.word()}`,
        ],
        { min: 0, max: 5 }
      ),
      tags: faker.helpers.arrayElements(
        ["helpful", "detailed", "verified", "expert", "critical", "positive"],
        { min: 0, max: 4 }
      ),
      categories: faker.helpers.arrayElements(
        ["Quality", "Service", "Value", "Features", "Support", "Delivery"],
        { min: 0, max: 3 }
      ),
      pros: faker.helpers.arrayElements(
        [faker.lorem.sentence(), faker.lorem.sentence()],
        { min: 0, max: 3 }
      ),
      cons: faker.helpers.arrayElements(
        [faker.lorem.sentence(), faker.lorem.sentence()],
        { min: 0, max: 3 }
      ),
      recommendation: faker.datatype.boolean()
        ? faker.helpers.arrayElement(["Yes", "No", "Maybe", "Depends"])
        : null,
      wouldRecommend: faker.datatype.boolean(),
      wouldBuyAgain: faker.datatype.boolean(),
      experienceLevel: faker.helpers.arrayElement([
        "Beginner",
        "Intermediate",
        "Advanced",
        "Expert",
        "First-time user",
      ]),
      usageDuration: faker.helpers.arrayElement([
        "< 1 week",
        "1-4 weeks",
        "1-6 months",
        "6-12 months",
        "> 1 year",
      ]),
      isSpam: faker.datatype.boolean(),
      spamScore: faker.number.float({ min: 0, max: 1, fractionDigits: 2 }),
      isFlagged: faker.datatype.boolean(),
      flaggedBy: faker.helpers.arrayElements([faker.person.fullName()], {
        min: 0,
        max: 3,
      }),
      flagReason: faker.datatype.boolean()
        ? faker.helpers.arrayElement([
            "Inappropriate",
            "Spam",
            "Offensive",
            "Off-topic",
            "Misleading",
          ])
        : null,
      moderatedBy: faker.datatype.boolean() ? faker.person.fullName() : null,
      moderatedAt: faker.datatype.boolean()
        ? faker.date.recent({ days: 7 }).toISOString()
        : null,
      moderationNotes: faker.datatype.boolean() ? faker.lorem.sentence() : null,
      reportCount: faker.number.int({ min: 0, max: 20 }),
      source: faker.helpers.arrayElement([
        "Website",
        "Mobile App",
        "Email",
        "Social Media",
        "Survey",
        "Third-party",
      ]),
      ipAddress: faker.internet.ip(),
      userAgent: faker.internet.userAgent(),
      device: faker.helpers.arrayElement(["Desktop", "Mobile", "Tablet"]),
      location: faker.datatype.boolean()
        ? `${faker.location.city()}, ${faker.location.country()}`
        : null,
      responseFromAuthor: faker.datatype.boolean(),
      authorResponse: faker.datatype.boolean()
        ? {
            content: faker.lorem.paragraph(),
            respondedBy: faker.person.fullName(),
            respondedAt: faker.date.recent({ days: 5 }).toISOString(),
          }
        : null,
      characterCount: faker.number.int({ min: 50, max: 5000 }),
      wordCount: faker.number.int({ min: 10, max: 1000 }),
      readingTime: `${faker.number.int({ min: 1, max: 10 })} min`,
      createdAt: faker.date.past({ years: 2 }).toISOString(),
      updatedAt: faker.date.recent({ days: 30 }).toISOString(),
      publishedAt: faker.datatype.boolean()
        ? faker.date.past({ years: 1 }).toISOString()
        : null,
    }),
  },
  ticket: {
    label: "Ticket / Support Case / Help Request",
    generator: () => ({
      id: faker.string.uuid(),
      ticketNumber: `TKT-${faker.string.alphanumeric(8).toUpperCase()}`,
      type: faker.helpers.arrayElement([
        "support",
        "bug",
        "feature-request",
        "question",
        "complaint",
        "incident",
        "service-request",
        "change-request",
      ]),
      category: faker.helpers.arrayElement([
        "Technical",
        "Billing",
        "Account",
        "Product",
        "Service",
        "Sales",
        "General Inquiry",
        "Feedback",
      ]),
      subcategory: faker.helpers.arrayElement([
        "Login Issue",
        "Payment Problem",
        "Feature Not Working",
        "Data Loss",
        "Performance",
        "Integration",
        "Documentation",
        "Other",
      ]),
      status: faker.helpers.arrayElement([
        "new",
        "open",
        "pending",
        "in-progress",
        "waiting-for-customer",
        "resolved",
        "closed",
        "cancelled",
        "on-hold",
      ]),
      priority: faker.helpers.arrayElement([
        "low",
        "normal",
        "high",
        "urgent",
        "critical",
      ]),
      severity: faker.helpers.arrayElement([
        "minor",
        "moderate",
        "major",
        "critical",
        "blocker",
      ]),
      subject: faker.lorem.words({ min: 4, max: 10 }),
      description: faker.lorem.paragraph({ min: 2, max: 4 }),
      stepsToReproduce: faker.helpers.arrayElements(
        [
          faker.lorem.sentence(),
          faker.lorem.sentence(),
          faker.lorem.sentence(),
        ],
        { min: 0, max: 5 }
      ),
      expectedBehavior: faker.datatype.boolean()
        ? faker.lorem.sentence()
        : null,
      actualBehavior: faker.datatype.boolean() ? faker.lorem.sentence() : null,
      requesterId: faker.string.uuid(),
      requesterName: faker.person.fullName(),
      requesterEmail: faker.internet.email(),
      requesterPhone: faker.datatype.boolean() ? faker.phone.number() : null,
      requesterCompany: faker.datatype.boolean() ? faker.company.name() : null,
      requesterRole: faker.helpers.arrayElement([
        "Customer",
        "User",
        "Admin",
        "Partner",
        "Employee",
      ]),
      assignedTo: faker.datatype.boolean() ? faker.person.fullName() : null,
      assignedToId: faker.datatype.boolean() ? faker.string.uuid() : null,
      assignedTeam: faker.helpers.arrayElement([
        "Support",
        "Engineering",
        "Sales",
        "Product",
        "DevOps",
        "Security",
        "Billing",
      ]),
      department: faker.helpers.arrayElement([
        "Customer Support",
        "Technical Support",
        "Sales",
        "Billing",
        "IT",
        "Product",
      ]),
      agentId: faker.datatype.boolean() ? faker.string.uuid() : null,
      agentName: faker.datatype.boolean() ? faker.person.fullName() : null,
      queue: faker.helpers.arrayElement([
        "General",
        "VIP",
        "Technical",
        "Billing",
        "Escalated",
        "Tier 1",
        "Tier 2",
        "Tier 3",
      ]),
      tags: faker.helpers.arrayElements(
        ["bug", "urgent", "customer-issue", "vip", "escalated", "follow-up"],
        { min: 1, max: 5 }
      ),
      labels: faker.helpers.arrayElements(
        ["needs-review", "waiting-info", "in-progress", "approved"],
        { min: 0, max: 3 }
      ),
      channel: faker.helpers.arrayElement([
        "Email",
        "Phone",
        "Chat",
        "Web Form",
        "Social Media",
        "API",
        "In-App",
      ]),
      source: faker.helpers.arrayElement([
        "Direct Contact",
        "Website",
        "Mobile App",
        "Email",
        "Phone",
        "Chat",
        "Social Media",
        "Partner",
      ]),
      sla: {
        responseTime: `${faker.number.int({ min: 1, max: 24 })} hours`,
        resolutionTime: `${faker.number.int({ min: 1, max: 72 })} hours`,
        responseDeadline: faker.date.soon().toISOString(),
        resolutionDeadline: faker.date.soon({ days: 3 }).toISOString(),
        breached: faker.datatype.boolean(),
        breachTime: faker.datatype.boolean()
          ? faker.date.past().toISOString()
          : null,
      },
      createdAt: faker.date.recent({ days: 60 }).toISOString(),
      updatedAt: faker.date.recent({ days: 5 }).toISOString(),
      firstResponseAt: faker.datatype.boolean()
        ? faker.date.recent({ days: 58 }).toISOString()
        : null,
      resolvedAt: faker.datatype.boolean()
        ? faker.date.recent({ days: 10 }).toISOString()
        : null,
      closedAt: faker.datatype.boolean()
        ? faker.date.recent({ days: 7 }).toISOString()
        : null,
      dueDate: faker.datatype.boolean()
        ? faker.date.soon().toISOString().split("T")[0]
        : null,
      firstResponseTime: faker.datatype.boolean()
        ? `${faker.number.int({ min: 5, max: 1440 })} minutes`
        : null,
      resolutionTime: faker.datatype.boolean()
        ? `${faker.number.int({ min: 1, max: 72 })} hours`
        : null,
      responses: faker.number.int({ min: 0, max: 50 }),
      internalNotes: faker.number.int({ min: 0, max: 20 }),
      publicComments: faker.number.int({ min: 0, max: 30 }),
      conversationHistory: faker.helpers.arrayElements(
        [
          {
            id: faker.string.uuid(),
            author: faker.person.fullName(),
            type: faker.helpers.arrayElement([
              "comment",
              "note",
              "response",
              "status-change",
            ]),
            content: faker.lorem.paragraph(),
            timestamp: faker.date.recent({ days: 30 }).toISOString(),
            isPublic: faker.datatype.boolean(),
          },
        ],
        { min: 1, max: 10 }
      ),
      hasAttachments: faker.datatype.boolean(),
      attachments: faker.helpers.arrayElements(
        [
          {
            id: faker.string.uuid(),
            name: `${faker.system.fileName()}.${faker.helpers.arrayElement([
              "pdf",
              "jpg",
              "png",
              "log",
              "zip",
            ])}`,
            type: faker.system.mimeType(),
            size: faker.number.int({ min: 1024, max: 10485760 }),
            uploadedBy: faker.person.fullName(),
            uploadedAt: faker.date.recent({ days: 20 }).toISOString(),
          },
        ],
        { min: 0, max: 8 }
      ),
      screenshots: faker.helpers.arrayElements([faker.image.url()], {
        min: 0,
        max: 5,
      }),
      relatedTickets: faker.helpers.arrayElements(
        [
          {
            id: faker.string.uuid(),
            number: `TKT-${faker.string.alphanumeric(8).toUpperCase()}`,
            relationship: faker.helpers.arrayElement([
              "duplicate",
              "related",
              "parent",
              "child",
              "follows",
              "blocks",
            ]),
          },
        ],
        { min: 0, max: 3 }
      ),
      linkedIssues: faker.helpers.arrayElements(
        [faker.string.alphanumeric(10).toUpperCase()],
        { min: 0, max: 5 }
      ),
      escalated: faker.datatype.boolean(),
      escalatedTo: faker.datatype.boolean() ? faker.person.fullName() : null,
      escalatedAt: faker.datatype.boolean()
        ? faker.date.recent({ days: 15 }).toISOString()
        : null,
      escalationReason: faker.datatype.boolean()
        ? faker.lorem.sentence()
        : null,
      escalationLevel: faker.datatype.boolean()
        ? faker.number.int({ min: 1, max: 3 })
        : 0,
      satisfaction: faker.datatype.boolean()
        ? {
            rating: faker.number.float({ min: 1, max: 5, fractionDigits: 1 }),
            comment: faker.lorem.sentence(),
            submittedAt: faker.date.recent({ days: 5 }).toISOString(),
          }
        : null,
      feedback: faker.datatype.boolean() ? faker.lorem.sentence() : null,
      resolution: faker.datatype.boolean() ? faker.lorem.paragraph() : null,
      resolutionType: faker.datatype.boolean()
        ? faker.helpers.arrayElement([
            "Fixed",
            "Workaround",
            "Known Issue",
            "User Error",
            "Feature Request",
            "Cannot Reproduce",
          ])
        : null,
      rootCause: faker.datatype.boolean() ? faker.lorem.sentence() : null,
      affectedUsers: faker.number.int({ min: 1, max: 1000 }),
      impact: faker.helpers.arrayElement([
        "Individual",
        "Team",
        "Organization",
        "Multiple Customers",
        "All Users",
      ]),
      environment: faker.helpers.arrayElement([
        "Production",
        "Staging",
        "Development",
        "Testing",
        "Unknown",
      ]),
      version: faker.datatype.boolean()
        ? `v${faker.number.int({ min: 1, max: 10 })}.${faker.number.int({
            min: 0,
            max: 20,
          })}.${faker.number.int({ min: 0, max: 50 })}`
        : null,
      browser: faker.datatype.boolean()
        ? faker.helpers.arrayElement([
            "Chrome",
            "Firefox",
            "Safari",
            "Edge",
            "Other",
          ])
        : null,
      operatingSystem: faker.datatype.boolean()
        ? faker.helpers.arrayElement([
            "Windows",
            "macOS",
            "Linux",
            "iOS",
            "Android",
          ])
        : null,
      device: faker.helpers.arrayElement([
        "Desktop",
        "Mobile",
        "Tablet",
        "Other",
      ]),
      metadata: {
        ipAddress: faker.internet.ip(),
        userAgent: faker.internet.userAgent(),
        referrer: faker.internet.url(),
        sessionId: faker.string.alphanumeric(32),
      },
      customFields: faker.helpers.arrayElements(
        [
          { key: "custom_field_1", value: faker.lorem.word() },
          { key: "custom_field_2", value: faker.lorem.word() },
        ],
        { min: 0, max: 5 }
      ),
      isSpam: faker.datatype.boolean(),
      isArchived: faker.datatype.boolean(),
      archivedAt: faker.datatype.boolean()
        ? faker.date.past().toISOString()
        : null,
      reopened: faker.datatype.boolean(),
      reopenCount: faker.number.int({ min: 0, max: 5 }),
      lastReopenedAt: faker.datatype.boolean()
        ? faker.date.recent({ days: 20 }).toISOString()
        : null,
      automationApplied: faker.datatype.boolean(),
      automationRules: faker.helpers.arrayElements(
        ["Auto-assign", "Auto-tag", "Auto-escalate", "SLA reminder"],
        { min: 0, max: 3 }
      ),
      internalId: faker.number.int({ min: 1000, max: 999999 }),
      externalId: faker.datatype.boolean()
        ? faker.string.alphanumeric(20).toUpperCase()
        : null,
      billingImpact: faker.datatype.boolean(),
      billableTime: faker.datatype.boolean()
        ? `${faker.number.float({
            min: 0.5,
            max: 40,
            fractionDigits: 1,
          })} hours`
        : null,
      estimatedCost: faker.datatype.boolean()
        ? parseFloat(faker.commerce.price({ min: 50, max: 5000 }))
        : null,
    }),
  },
  log: {
    label: "Log / Audit / Change History",
    generator: () => ({
      id: faker.string.uuid(),
      logId: faker.string.alphanumeric(16).toUpperCase(),
      type: faker.helpers.arrayElement([
        "audit",
        "access",
        "error",
        "activity",
        "system",
        "security",
        "change",
        "transaction",
        "debug",
        "info",
      ]),
      level: faker.helpers.arrayElement([
        "debug",
        "info",
        "notice",
        "warning",
        "error",
        "critical",
        "alert",
        "emergency",
      ]),
      severity: faker.helpers.arrayElement([
        "low",
        "medium",
        "high",
        "critical",
      ]),
      category: faker.helpers.arrayElement([
        "Authentication",
        "Authorization",
        "Database",
        "API",
        "File System",
        "Network",
        "User Action",
        "System Event",
        "Configuration",
      ]),
      event: faker.helpers.arrayElement([
        "User Login",
        "User Logout",
        "Record Created",
        "Record Updated",
        "Record Deleted",
        "File Uploaded",
        "File Downloaded",
        "Permission Changed",
        "Configuration Updated",
        "Error Occurred",
        "System Started",
        "System Stopped",
        "Backup Created",
        "API Request",
      ]),
      action: faker.helpers.arrayElement([
        "create",
        "read",
        "update",
        "delete",
        "login",
        "logout",
        "access",
        "modify",
        "execute",
        "export",
        "import",
      ]),
      status: faker.helpers.arrayElement([
        "success",
        "failure",
        "pending",
        "warning",
        "error",
        "completed",
      ]),
      message: faker.lorem.sentence(),
      description: faker.lorem.paragraph(),
      timestamp: faker.date.recent({ days: 90 }).toISOString(),
      date: faker.date.recent({ days: 90 }).toISOString().split("T")[0],
      time: faker.date.recent().toISOString().split("T")[1].split(".")[0],
      userId: faker.datatype.boolean() ? faker.string.uuid() : null,
      username: faker.datatype.boolean() ? faker.internet.username() : null,
      userEmail: faker.datatype.boolean() ? faker.internet.email() : null,
      userRole: faker.datatype.boolean()
        ? faker.helpers.arrayElement([
            "Admin",
            "User",
            "Manager",
            "Developer",
            "Support",
            "Guest",
          ])
        : null,
      actorId: faker.datatype.boolean() ? faker.string.uuid() : "system",
      actorType: faker.helpers.arrayElement([
        "user",
        "system",
        "api",
        "service",
        "automation",
        "integration",
      ]),
      actorName: faker.datatype.boolean() ? faker.person.fullName() : "System",
      targetId: faker.datatype.boolean() ? faker.string.uuid() : null,
      targetType: faker.datatype.boolean()
        ? faker.helpers.arrayElement([
            "user",
            "product",
            "order",
            "document",
            "file",
            "record",
            "setting",
            "configuration",
          ])
        : null,
      targetName: faker.datatype.boolean() ? faker.lorem.words(3) : null,
      resourceId: faker.datatype.boolean() ? faker.string.uuid() : null,
      resourceType: faker.helpers.arrayElement([
        "table",
        "file",
        "api-endpoint",
        "service",
        "database",
        "server",
        "application",
      ]),
      entityId: faker.datatype.boolean() ? faker.string.uuid() : null,
      entityType: faker.datatype.boolean()
        ? faker.helpers.arrayElement([
            "customer",
            "order",
            "product",
            "invoice",
            "user",
            "document",
          ])
        : null,
      operation: faker.helpers.arrayElement([
        "INSERT",
        "UPDATE",
        "DELETE",
        "SELECT",
        "EXECUTE",
        "GRANT",
        "REVOKE",
      ]),
      method: faker.helpers.arrayElement([
        "GET",
        "POST",
        "PUT",
        "DELETE",
        "PATCH",
        "OPTIONS",
        "HEAD",
      ]),
      endpoint: faker.datatype.boolean()
        ? `/api/v1/${faker.lorem.word()}/${faker.string.alphanumeric(8)}`
        : null,
      url: faker.datatype.boolean() ? faker.internet.url() : null,
      path: faker.datatype.boolean()
        ? `/${faker.lorem.word()}/${faker.lorem.word()}`
        : null,
      ipAddress: faker.internet.ip(),
      ipLocation: `${faker.location.city()}, ${faker.location.country()}`,
      userAgent: faker.internet.userAgent(),
      browser: faker.helpers.arrayElement([
        "Chrome",
        "Firefox",
        "Safari",
        "Edge",
        "Other",
      ]),
      device: faker.helpers.arrayElement([
        "Desktop",
        "Mobile",
        "Tablet",
        "Server",
        "API",
      ]),
      operatingSystem: faker.helpers.arrayElement([
        "Windows",
        "macOS",
        "Linux",
        "iOS",
        "Android",
        "Server OS",
      ]),
      sessionId: faker.datatype.boolean()
        ? faker.string.alphanumeric(32)
        : null,
      requestId: faker.datatype.boolean() ? faker.string.uuid() : null,
      transactionId: faker.datatype.boolean()
        ? faker.string.alphanumeric(20).toUpperCase()
        : null,
      correlationId: faker.datatype.boolean() ? faker.string.uuid() : null,
      traceId: faker.datatype.boolean() ? faker.string.alphanumeric(32) : null,
      spanId: faker.datatype.boolean() ? faker.string.alphanumeric(16) : null,
      changes: faker.datatype.boolean()
        ? faker.helpers.arrayElements(
            [
              {
                field: faker.lorem.word(),
                oldValue: faker.lorem.word(),
                newValue: faker.lorem.word(),
                changedAt: faker.date.recent().toISOString(),
              },
            ],
            { min: 1, max: 5 }
          )
        : null,
      before: faker.datatype.boolean()
        ? {
            [faker.lorem.word()]: faker.lorem.word(),
            [faker.lorem.word()]: faker.number.int({ min: 1, max: 100 }),
          }
        : null,
      after: faker.datatype.boolean()
        ? {
            [faker.lorem.word()]: faker.lorem.word(),
            [faker.lorem.word()]: faker.number.int({ min: 1, max: 100 }),
          }
        : null,
      diff: faker.datatype.boolean() ? faker.lorem.sentence() : null,
      errorCode: faker.datatype.boolean()
        ? faker.helpers.arrayElement([
            "ERR_001",
            "ERR_404",
            "ERR_500",
            "AUTH_001",
            "DB_001",
          ])
        : null,
      errorMessage: faker.datatype.boolean() ? faker.lorem.sentence() : null,
      stackTrace: faker.datatype.boolean()
        ? faker.lorem.lines({ min: 3, max: 10 })
        : null,
      exception: faker.datatype.boolean() ? faker.lorem.sentence() : null,
      duration: faker.datatype.boolean()
        ? faker.number.int({ min: 1, max: 10000 })
        : null,
      durationUnit: "ms",
      responseTime: faker.datatype.boolean()
        ? `${faker.number.int({ min: 10, max: 5000 })} ms`
        : null,
      executionTime: faker.datatype.boolean()
        ? `${faker.number.float({
            min: 0.1,
            max: 60,
            fractionDigits: 2,
          })} seconds`
        : null,
      statusCode: faker.datatype.boolean()
        ? faker.helpers.arrayElement([
            200, 201, 204, 400, 401, 403, 404, 500, 502, 503,
          ])
        : null,
      responseSize: faker.datatype.boolean()
        ? faker.number.int({ min: 100, max: 1000000 })
        : null,
      responseSizeFormatted: faker.datatype.boolean()
        ? `${faker.number.float({ min: 0.1, max: 10, fractionDigits: 2 })} KB`
        : null,
      requestSize: faker.datatype.boolean()
        ? faker.number.int({ min: 100, max: 100000 })
        : null,
      requestBody: faker.datatype.boolean()
        ? JSON.stringify({ [faker.lorem.word()]: faker.lorem.word() })
        : null,
      responseBody: faker.datatype.boolean()
        ? JSON.stringify({ status: "success", data: {} })
        : null,
      parameters: faker.datatype.boolean()
        ? {
            [faker.lorem.word()]: faker.lorem.word(),
            [faker.lorem.word()]: faker.number.int(),
          }
        : null,
      queryParams: faker.datatype.boolean()
        ? {
            page: faker.number.int({ min: 1, max: 100 }),
            limit: faker.number.int({ min: 10, max: 100 }),
          }
        : null,
      headers: faker.datatype.boolean()
        ? { "Content-Type": "application/json", Authorization: "Bearer ***" }
        : null,
      tags: faker.helpers.arrayElements(
        [
          "production",
          "staging",
          "critical",
          "security",
          "performance",
          "automated",
        ],
        { min: 0, max: 4 }
      ),
      labels: faker.helpers.arrayElements(
        ["error", "warning", "success", "audit"],
        { min: 0, max: 3 }
      ),
      environment: faker.helpers.arrayElement([
        "production",
        "staging",
        "development",
        "testing",
        "qa",
      ]),
      service: faker.helpers.arrayElement([
        "web-app",
        "api",
        "database",
        "authentication",
        "payment",
        "notification",
        "storage",
      ]),
      component: faker.helpers.arrayElement([
        "frontend",
        "backend",
        "database",
        "cache",
        "queue",
        "scheduler",
      ]),
      module: faker.datatype.boolean() ? faker.lorem.word() : null,
      function: faker.datatype.boolean() ? faker.lorem.word() + "()" : null,
      lineNumber: faker.datatype.boolean()
        ? faker.number.int({ min: 1, max: 10000 })
        : null,
      filename: faker.datatype.boolean()
        ? `${faker.system.fileName()}.${faker.helpers.arrayElement([
            "js",
            "py",
            "java",
            "php",
          ])}`
        : null,
      version: faker.datatype.boolean()
        ? `v${faker.number.int({ min: 1, max: 5 })}.${faker.number.int({
            min: 0,
            max: 20,
          })}.${faker.number.int({ min: 0, max: 50 })}`
        : null,
      applicationVersion: faker.datatype.boolean()
        ? `${faker.number.int({ min: 1, max: 10 })}.${faker.number.int({
            min: 0,
            max: 50,
          })}`
        : null,
      region: faker.datatype.boolean()
        ? faker.helpers.arrayElement([
            "us-east-1",
            "us-west-2",
            "eu-west-1",
            "ap-southeast-1",
          ])
        : null,
      datacenter: faker.datatype.boolean()
        ? faker.helpers.arrayElement(["DC1", "DC2", "DC3"])
        : null,
      server: faker.datatype.boolean()
        ? `server-${faker.string.alphanumeric(8)}`
        : null,
      hostname: faker.datatype.boolean() ? faker.internet.domainName() : null,
      processId: faker.datatype.boolean()
        ? faker.number.int({ min: 1000, max: 99999 })
        : null,
      threadId: faker.datatype.boolean()
        ? faker.number.int({ min: 1, max: 1000 })
        : null,
      memoryUsage: faker.datatype.boolean()
        ? `${faker.number.int({ min: 50, max: 2000 })} MB`
        : null,
      cpuUsage: faker.datatype.boolean()
        ? `${faker.number.int({ min: 1, max: 100 })}%`
        : null,
      isAnomaly: faker.datatype.boolean(),
      isSecurityEvent: faker.datatype.boolean(),
      isCritical: faker.datatype.boolean(),
      requiresAction: faker.datatype.boolean(),
      actionTaken: faker.datatype.boolean() ? faker.lorem.sentence() : null,
      actionTakenBy: faker.datatype.boolean() ? faker.person.fullName() : null,
      acknowledgedBy: faker.datatype.boolean() ? faker.person.fullName() : null,
      acknowledgedAt: faker.datatype.boolean()
        ? faker.date.recent({ days: 7 }).toISOString()
        : null,
      resolvedBy: faker.datatype.boolean() ? faker.person.fullName() : null,
      resolvedAt: faker.datatype.boolean()
        ? faker.date.recent({ days: 5 }).toISOString()
        : null,
      notes: faker.datatype.boolean() ? faker.lorem.sentence() : null,
      metadata: {
        source: faker.helpers.arrayElement([
          "Application",
          "System",
          "Security",
          "Database",
          "API",
        ]),
        retention: faker.helpers.arrayElement([
          "30 days",
          "90 days",
          "1 year",
          "7 years",
          "Permanent",
        ]),
        isArchived: faker.datatype.boolean(),
        isRedacted: faker.datatype.boolean(),
      },
      source: faker.helpers.arrayElement([
        "Application",
        "Database",
        "Server",
        "Network",
        "Security System",
        "Monitoring Tool",
      ]),
      sourceIp: faker.datatype.boolean() ? faker.internet.ip() : null,
      destinationIp: faker.datatype.boolean() ? faker.internet.ip() : null,
      protocol: faker.datatype.boolean()
        ? faker.helpers.arrayElement([
            "HTTP",
            "HTTPS",
            "TCP",
            "UDP",
            "SSH",
            "FTP",
          ])
        : null,
      port: faker.datatype.boolean()
        ? faker.number.int({ min: 80, max: 65535 })
        : null,
      isArchived: faker.datatype.boolean(),
      archivedAt: faker.datatype.boolean()
        ? faker.date.past().toISOString()
        : null,
      retentionUntil: faker.date
        .future({ years: 1 })
        .toISOString()
        .split("T")[0],
      isDeleted: faker.datatype.boolean(),
      deletedAt: faker.datatype.boolean()
        ? faker.date.past().toISOString()
        : null,
      createdAt: faker.date.recent({ days: 90 }).toISOString(),
      indexedAt: faker.date.recent({ days: 90 }).toISOString(),
    }),
  },
};
