import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function PrivacyPage() {
    return (
      <>
       <Header/>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-green-700 mb-8">Privacy Policy</h1>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-green-600">Our Commitment to Your Privacy</h2>
            <p className="mb-4">
              At DiabetesCare Kenya, we take your privacy seriously. This Privacy Policy explains how we collect, 
              use, disclose, and safeguard your information when you use our platform and services.
            </p>
            <p>
              Last updated: March 1, 2025
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-green-600">Information We Collect</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-medium mb-2">Personal Information</h3>
                <p>
                  We collect information that identifies, relates to, describes, or could reasonably be linked to you, 
                  including:
                </p>
                <ul className="list-disc ml-6 mt-2">
                  <li>Name, email address, phone number, and other contact details</li>
                  <li>Date of birth, gender, and other demographic information</li>
                  <li>Medical history, current medications, and other health-related information</li>
                  <li>Blood glucose readings and other biometric data</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-medium mb-2">Usage Data</h3>
                <p>
                  We automatically collect certain information when you access or use our platform, including:
                </p>
                <ul className="list-disc ml-6 mt-2">
                  <li>Device information (type, operating system, browser)</li>
                  <li>Log data (IP address, access times, pages viewed)</li>
                  <li>App usage patterns and feature engagement</li>
                </ul>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-green-600">How We Use Your Information</h2>
            <p className="mb-2">We use your information for the following purposes:</p>
            <ul className="list-disc ml-6 space-y-2">
              <li>Providing personalized diabetes management tools and recommendations</li>
              <li>Analyzing trends to improve our platform and services</li>
              <li>Communicating with you about your account, updates, and health insights</li>
              <li>Identifying and preventing fraudulent activities</li>
              <li>Complying with legal obligations and healthcare regulations</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-green-600">Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your data, including 
              encryption, access controls, and regular security assessments. We comply with international 
              healthcare data protection standards and the Data Protection Act of Kenya.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-green-600">Sharing Your Information</h2>
            <p className="mb-4">
              We may share your information with:
            </p>
            <ul className="list-disc ml-6 space-y-2">
              <li>Healthcare providers authorized by you to access your data</li>
              <li>Service providers who help us operate our platform</li>
              <li>Regulatory authorities when required by law</li>
            </ul>
            <p className="mt-4">
              We do not sell your personal information to third parties for marketing purposes.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-green-600">Your Rights</h2>
            <p className="mb-2">You have the right to:</p>
            <ul className="list-disc ml-6 space-y-2">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data (subject to certain exceptions)</li>
              <li>Opt-out of certain data processing activities</li>
              <li>Withdraw consent at any time</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-green-600">Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by 
              posting the new policy on this page and updating the "Last updated" date.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-green-600">Contact Us</h2>
            <p>
              If you have any questions or concerns about this Privacy Policy, please contact us at:
            </p>
            <div className="mt-2">
              <p>Email: privacy@diabetescarekenya.co.ke</p>
              <p>Phone: +254 112291829</p>
              <p>Address: Westlands Business Park, Nairobi, Kenya</p>
            </div>
          </section>
        </div>
      </div>
      <Footer/>
      </>
    );
  }
