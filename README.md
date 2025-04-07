# DiabetesCare Kenya  ![Microsoft Data AI Hack](/public/microsoft.png)  

DiabetesCare Kenya is a comprehensive web-based platform designed to empower Kenyans with diabetes to better manage their condition through real-time monitoring, personalized insights, and AI-powered support.  

![DiabetesCare Kenya Dashboard](/public/diabetes-kenya.png)  

## Project Overview  

DiabetesCare Kenya addresses the growing need for accessible, locally-relevant diabetes management tools in Kenya. Our platform combines user-friendly interfaces with advanced technology to help users track glucose readings, manage appointments, and receive personalized health guidance.  

### Key Features  

- **Real-time Glucose Monitoring**: Track and visualize glucose levels with intuitive charts 
- **Personalized Health Insights**: Receive AI-powered recommendations based on your health data 
- **Risk Assessment**: Stay informed about potential health issues with predictive analytics 
- **Appointment Management**: Schedule and manage healthcare appointments 
- **AI Health Companion**: Get answers to diabetes management questions using Azure AI 
- **Secure Data Storage**: All health data is encrypted and protected  

## Technology Stack  

- **Frontend**: React.js with Tailwind CSS 
- **Backend**: Node.js/Express 
- **Data Analytics**: Microsoft Fabric (planned integration) 
- **AI Services**: Azure AI 
- **Authentication**: JWT-based secure authentication
- **Database**: PostgreSQL with Prisma ORM

## User Roles  

### Patient User 
- Monitor glucose readings and trends 
- View personalized health insights 
- Schedule appointments 
- Interact with AI Health Companion 
- Access educational resources  

### Administrator 
- User management 
- System monitoring 
- Application performance tracking 
- Configuration management  

### Doctor (Coming Soon) 
- Patient monitoring dashboard 
- Treatment plan customization 
- Secure communication with patients 
- Access to patient analytics  

## Token System  

The application implements a token-based system for AI interactions: 
- Free users receive 100 tokens daily (resets at midnight) 
- Basic plan (KSH 2,000/month): 100,000 tokens monthly 
- Premium plan (KSH 3,000/month): 200,000 tokens monthly  

## Data Flow Architecture

Our application follows a sophisticated data processing pipeline:

1. **User Input**: Users log glucose readings through the web interface
2. **Data Processing**: Readings are processed by our backend services
3. **Microsoft Fabric Integration** (Planned): Data is sent to Microsoft Fabric for advanced analytics
4. **Analysis**: Processed data returns with insights and predictions
5. **AI Enhancement**: Azure AI analyzes user data and provides personalized responses
6. **User Interface**: Results are displayed to users in an intuitive dashboard

> **Note**: While our architecture is designed for Microsoft Fabric integration, current implementation uses local processing due to organizational email requirements for Fabric access. Our solution includes all necessary steps for seamless Fabric integration when organizational credentials become available.

## Microsoft Fabric Integration (Planned)  

While the current version stores data locally, future releases will integrate with Microsoft Fabric to enable: 

- **Real-Time Analytics with Eventstream**:
  - Process glucose readings in real-time
  - Enable instant alerts for dangerous glucose level changes
  - Connect continuous glucose monitors directly to data pipeline

- **Predictive Analytics with Fabric Data Science**:
  - Build ML models to predict hypo/hyperglycemic events
  - Create personalized risk models for patients
  - Develop Kenya-specific diabetes progression models

- **Data Warehouse Integration**:
  - Store historical patient data for efficient querying
  - Enable analysis across demographics
  - Generate population health insights

- **OneLake Data Lake Storage**:
  - Create a secure centralized repository for all patient data
  - Store unstructured data like appointment notes and dietary logs
  - Implement data versioning to track health metrics over time

- **Power BI Integration**:
  - Build interactive dashboards for healthcare providers
  - Create visual representations of glucose trends
  - Develop executive dashboards for health system administrators

## Installation and Setup  

```bash
# Clone the repository 
git clone https://github.com/ahmednule/diabetescare-kenya.git  

# Navigate to project directory 
cd diabetescare-kenya  

# Install dependencies 
npm install

# Set up environment variables
cp .env.example .env

# Configure the following in your .env file:
# - DATABASE_URL (your PostgreSQL connection string)
# - JWT_SECRET (secure random string for authentication)
# - AZURE_OPENAI_API_KEY (from Azure AI services portal)
# - AZURE_OPENAI_ENDPOINT (your Azure OpenAI service endpoint)

# Run database migrations
npx prisma migrate dev

# Create an admin user
npm run create-admin

# Start the development server 
npm run dev
```

## Screenshots  

### User Dashboard 
![User Dashboard](/public/user-dashboard.png) 
The user dashboard provides a comprehensive view of glucose trends, recent readings, and health metrics.  

### Billing & Subscription 
![Billing Page](/public/billing-page.png) 
Users can choose from different subscription plans based on their needs.  

## Contributing  

Contributions are welcome! Please feel free to submit a Pull Request.  

## License  

This project is licensed under the MIT License - see the LICENSE file for details.  

## Acknowledgments  

- Microsoft for providing the Azure AI and Fabric platform 
- The diabetes healthcare community in Kenya for valuable insights 
- All contributors and testers who have helped improve this platform