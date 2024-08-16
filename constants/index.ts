export const GenderOptions = ["Male", "Female", "Other"];

export const PatientFormDefaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  birthDate: new Date(Date.now()),
  gender: "Male" as Gender,
  address: "",
  occupation: "",
  emergencyContactName: "",
  emergencyContactNumber: "",
  primaryPhysician: "",
  insuranceProvider: "",
  insurancePolicyNumber: "",
  allergies: "",
  currentMedication: "",
  familyMedicalHistory: "",
  pastMedicalHistory: "",
  identificationType: "Birth Certificate",
  identificationNumber: "",
  identificationDocument: [],
  treatmentConsent: false,
  disclosureConsent: false,
  privacyConsent: false,
};

export const IdentificationTypes = [
  "Aadhar Card",
  "Voter ID Card",
  "Birth Certificate",
  "Driving License",
  "Medical Insurance Card/Policy",
  "Passport",
  "Marksheet 10/12",
  "Student College ID Card",
];

export const Doctors = [
  {
    image: "/assets/images/dr-green.png",
    name: "KK Jain",
  },
  {
    image: "/assets/images/dr-cameron.png",
    name: "Aditi Sharma",
  },
  {
    image: "/assets/images/dr-livingston.png",
    name: " Vikram Rao",
  },
  {
    image: "/assets/images/dr-peter.png",
    name: "Priya Menon",
  },
  {
    image: "/assets/images/dr-powell.png",
    name: "Neha Kapoor",
  },
  {
    image: "/assets/images/dr-remirez.png",
    name: " Sanya Gupta",
  },
  {
    image: "/assets/images/dr-lee.png",
    name: "Arjun Deshmukh",
  },
  {
    image: "/assets/images/dr-cruz.png",
    name: "Siddharth Patel",
  },
  {
    image: "/assets/images/dr-sharma.png",
    name: "Hardik Sharma",
  },
];

export const StatusIcon = {
  scheduled: "/assets/icons/check.svg",
  pending: "/assets/icons/pending.svg",
  cancelled: "/assets/icons/cancelled.svg",
};

