import dedent from 'ts-dedent';

// src/data/projects.js
const projectsData = [
  {
    id: 1,
    title: "TrainConv Framework",
    description: "A distributed training framework on PyTorch and TensorFlow with configuration-based pipelines and automated orchestration.",
    longDescription: dedent(`
    • **TrainConv** is an MSD wrapper built around PyTorch for training machine learning models.
    
    • **Purpose**:
      - Provides a standardized, simplified, and config-driven approach for building models.
      - Reduces boilerplate code and avoids repetitive integrations.
    
    • **Modular Design**:
      - Supports easy addition of modules such as loss functions, preprocessing pipelines, and custom data loaders.
    
    • **Hyperparameter Optimization**:
      - Integrated with the **Tune** library, enabling efficient hyperparameter searches.
    
    • **Local Setup**:
      - Can run locally using a virtual environment (\`virtualenv\`).
      - Dependencies defined in \`requirements.txt\`.
    
    • **Visualization & Monitoring**:
      - Utilizes **TensorBoard** for visualizing training metrics.
    `),
    technologies: ["PyTorch", "TensorFlow", "Distributed Computing", "Tune"],
    githubLink: "",
    demoLink: ""
  },
  {
    id: 2,
    title: "DeepGait",
    description: "An IoT-based intelligent gait analysis system using a 6-axis IMU, force sensors, and AWS integration.",
    longDescription: dedent(`
      DeepGait combines hardware and AI to create a comprehensive gait analysis platform. The system uses custom-designed insoles with embedded force sensors and a 6-axis IMU to capture detailed movement data. Our deep learning pipeline processes this data to extract gait parameters, detect anomalies, and provide actionable insights for physical therapy and rehabilitation. The cloud backend on AWS enables real-time monitoring, historical analysis, and personalized recommendations for users and healthcare providers.
    `),
    technologies: ["Deep Learning", "IoT", "AWS", "Embedded Systems", "Time-Series Analysis"],
    githubLink: "https://github.com/CodingBad02/deepgait",
    demoLink: "https://www.covaichronicle.com/english/contentview/forge30822"
  },
  {
    id: 3,
    title: "GCN for Pandemic Prediction",
    description: "Graph convolutional networks for predicting state-wise COVID-19 incidence with up to 85.3% accuracy.",
    longDescription: dedent(`
      This research project leverages the power of Graph Convolutional Networks (GCNs) to model and predict the spread of COVID-19 across Indian states. By representing states as nodes in a graph with edges defined by geographic adjacency and transportation links, our model captures the complex spatial dependencies in disease transmission. The model incorporates demographic, healthcare, and mobility data to achieve 85.3% prediction accuracy, outperforming traditional time-series and statistical approaches. The research was published in IEEE AISP 2022 and has implications for pandemic preparedness and resource allocation.
    `),
    technologies: ["GCN", "Graph Neural Networks", "PyTorch Geometric", "Spatiotemporal Modeling"],
    githubLink: "https://github.com/sid-sr/covid-19-gnn",
    demoLink: ""
  },
  {
    id: 4,
    title: "Real-time Ship Detection",
    description: "A modified YOLOV3 architecture for ship detection in synthetic radar images with high accuracy and performance.",
    longDescription: dedent(`
      This computer vision project addresses the challenge of detecting ships in Synthetic Aperture Radar (SAR) images under various conditions. We developed a modified YOLOv3 architecture optimized for SAR imagery, incorporating attention mechanisms and custom anchor boxes to improve detection accuracy. The system achieves 81.02% mAP and near 100% accuracy in element detection while maintaining real-time performance at 30+ FPS on standard GPU hardware. The solution is designed to integrate with maritime surveillance systems and can operate in adverse weather conditions where optical systems fail.
    `),
    technologies: ["YOLOv3", "Darknet", "Computer Vision", "Object Detection", "SAR Image Processing"],
    githubLink: "",
    demoLink: ""
  },
  {
    id: 5,
    title: "Programmable Insulin Delivery System",
    description: "Raspberry Pi-based closed-loop system for automated insulin delivery, leveraging continuous glucose monitoring and real-time processing.",
    longDescription: dedent(`
      • **Programmable Insulin Delivery System** is an embedded solution designed to replicate pancreatic functions by automating insulin administration.
      
      • **Purpose**:
        - Mimics natural pancreas behavior by dynamically adjusting insulin doses based on continuous glucose monitoring.
        - Enhances patient safety and comfort by reducing manual injections and ensuring near-normoglycemia.
      
      • **System Components**:
        - **Data Acquisition**: Integrates CGM sensors to continuously capture real-time blood glucose data.
        - **Processing Unit**: Utilizes a Raspberry Pi to process sensor data and employs cloud-based analytics for predictive dosing.
        - **Insulin Delivery**: Controls a micropump that administers precise insulin dosages through a closed-loop feedback system.
      
      • **Design & Integration**:
        - Developed as an 18-month, internally funded student project with a budget of 30K rupees.
        - Implements a robust closed-loop system that continuously monitors and adjusts insulin delivery.
      
      • **Innovation**:
        - Leverages SoC processing and online cloud computing to enable real-time insulin dosing adjustments.
        - Provides a wearable, automated approach to diabetes management, reducing reliance on traditional insulin syringes.
    `),
    technologies: ["Raspberry Pi", "Continuous Glucose Monitoring", "Micropump", "Cloud Computing", "Closed-Loop Control"],
    githubLink: "",
    demoLink: ""
  },
  {
    id: 6,
    title: "CaprioSim",
    description: "Traffic Sign Recognition and Flow Simulation using Cellular Automata. Integrates computer vision-based traffic sign detection with cellular automata simulation to model priority-based traffic flow at intersections.",
    longDescription: dedent(`
      • **Overview**:
        - Combines traffic sign recognition via computer vision with a cellular automata model to simulate dynamic traffic flow.
      
      • **Objective**:
        - Detect traffic signs in real-time and trigger corresponding vehicle responses.
        - Utilize a NxN sparse binary matrix updated by cellular automata rules to simulate priority-based state changes at intersections.
      
      • **Methodology**:
        - **Traffic Sign Recognition**: Employs computer vision techniques to identify and interpret traffic signals.
        - **Cellular Automata Simulation**: Uses graph cellular automata to model the flow of vehicles, dynamically updating the state of a traffic grid based on user-defined priority rules.
        - **Simulation Environment**: Runs on MATLAB for iterative, multi-generation analysis of traffic states.
      
      • **Innovation**:
        - Introduces a priority-based approach where the order of state transitions reflects realistic driver behavior.
        - Dynamically defines rule matrices and adjacency relationships for nuanced control of traffic flow.
      
      • **Collaboration**:
        - Research conducted under the guidance of Dr. B. Praba, Professor and Head of the Mathematics Department at SSN.
        - Presented at SSNCE in August 2021.
    `),
    technologies: ["MATLAB", "Cellular Automata", "Graph Theory", "Computer Vision"],
    githubLink: "",
    demoLink: ""
  }
];

export default projectsData;