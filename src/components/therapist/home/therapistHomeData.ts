const therapistHomeData = {
  title: "Welcome to MyHelp GRP2",
  intro:
    "We have created the MyHelp platform to support both therapists and patients in their pursuit of a smoother therapy process. MyHelp empowers therapists throughout the entire process and delivers personalised care with the aim to improve therapist outcomes. Simultaneously, patients can access their own platform to access key information to support their progress and communicate more efficiently with their therapist. We believe the MyHelp platform will enhance the therapeutic relationship in order to deliver better results.",
  contactEmailLabel: "For Queries",
  contactEmail: "enquiries@myhelp.co.uk",
  detail: [
    {
      id: "record1",
      icon: require("@mui/icons-material/CalendarMonthOutlined").default,
      title: "Calendar",
      description:
        "Customisable appointment manager, here you can schedule new appointments and ensure that you effectively utilise your time.",
    },
    {
      id: "record2",
      icon: require("@mui/icons-material/LibraryBooksOutlined").default,
      title: "Library",
      description:
        "An extensive range of resources available for assigning and sharing to patients to help the therapy process and as when required. These include: worksheets, info sheets, audio and video resources. It is also possible to create individual resources to personalise the therapy and ensure that specific patient needs are considered.",
    },
    {
      id: "record3",
      icon: require("@mui/icons-material/MessageOutlined").default,
      title: "Communication",
      description:
        "Connect directly with your patients, through video or audio calls or live messaging. This enables a more direct contact with your patient away from personal devices, and in an area where their data is protected but can be easily accessed.",
    },
    {
      id: "record4",
      icon: require("@mui/icons-material/LibraryBooksOutlined").default,
      title: "Agenda",
      description:
        "Having selected a disorder or a number of disorders to support a patient, the MyHelp platform provides suggested agendas to guide the therapy which can be amended by the Therapists as appropriate.",
    },
    {
      id: "record5",
      icon: require("@mui/icons-material/StarsOutlined").default,
      title: "Goals",
      description:
        "Therapists can agree the overall goal of the therapy process with patients, providing a clear objective of the therapy and also evaluating their success. The opportunity to add goals exists if Therapists wish to identify specific areas they want to include as therapy targets.",
    },
    {
      id: "record6",
      icon: require("@mui/icons-material/EqualizerOutlined").default,
      title: "Measures",
      description:
        "The current PHQ 9 and GAD 7 scores for a patient can be found here and can be either updated by either the therapist or patient electronically. The therapy outcomes are illustrated in a graphical chart to provide a visual representation of the patient’s progress.",
    },
    {
      id: "record7",
      icon: require("@mui/icons-material/MonitorOutlined").default,
      title: "Monitors",
      description:
        "Having selected a disorder or a number of disorders to support a patient, the MyHelp platform provides suggested agendas to guide the therapy which can be amended by the Therapist as appropriate.",
    },
    {
      id: "record8",
      icon: require("@mui/icons-material/TaskOutlined").default,
      title: "Homework Tasks",
      description:
        "Therapists can agree the overall goal of the therapy process with patients, providing a clear objective of the therapy and also evaluating their success. The opportunity to add goals exists if Therapists wish to identify specific areas they want to include as therapy targets.",
    },
    {
      id: "record9",
      icon: require("@mui/icons-material/GroupsOutlined").default,
      title: "Patient",
      description:
        "Refer and keep up to date patient files. This can be accessed and used whilst in session with a particular patient, providing the ability to refer to specific communications and information. The patient's section supports the therapy process by providing a number of elements that are key for the therapy process .",
    },
    {
      id: "record10",
      icon: require("@mui/icons-material/MedicalInformation").default,
      title: "Assessment",
      description:
        "Refer and keep up to date patient files. This can be accessed and used whilst in session with a particular patient, providing the ability to refer to specific communications and information. The patient's section supports the therapy process by providing a number of elements that are key for the therapy process .",
    },
    {
      id: "record11",
      icon: require("@mui/icons-material/FormatAlignJustify").default,
      title: "Others",
      description:
        "The current PHQ 9 and GAD 7 scores for a patient can be found here and can be either updated by either the therapist or patient electronically. The therapy outcomes are illustrated in a graphical chart to provide a visual representation of the patient’s progress.",
    },
  ],
};

export default therapistHomeData;

export interface DetailObjectTypes {
  id?: string;
  icon?: any;
  title?: string;
  description?: string;
}

export interface TherapistHomeDataTypes {
  title?: string;
  intro?: string;
  contactEmailLabel?: string;
  contactEmail?: string;
  detail?: DetailObjectTypes[];
}
