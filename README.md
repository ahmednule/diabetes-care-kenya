# DiabetesCare Kenya

![Microsoft Data AI Hack](/public/microsoft.png)

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

## Microsoft Fabric Integration (Planned)

While the current version stores data locally, future releases will integrate with Microsoft Fabric to enable:
- Advanced data analytics
- Predictive modeling
- Population health insights
- Enhanced reporting capabilities

> Note: Microsoft Fabric integration is currently in development and will be implemented in a future release.

## Installation and Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/diabetescare-kenya.git

# Navigate to project directory
cd diabetescare-kenya

# Install dependencies
npm install

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