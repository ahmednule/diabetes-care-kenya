import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function TermsPage() {
    return (
        <>
        <Header/>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center text-green-700 mb-8">Terms and Conditions</h1>
        
        <div className="space-y-8">
          <section>
            <p className="mb-4">
              Welcome to DiabetesCare Kenya. These Terms and Conditions govern your use of our platform 
              and services. By accessing or using DiabetesCare Kenya, you agree to be bound by these Terms.
            </p>
            <p>
              Last updated: March 1, 2025
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-green-600">1. Definitions</h2>
            <ul className="list-disc ml-6 space-y-2">
              <li><strong>"Platform"</strong> refers to the DiabetesCare Kenya application, website, and related services.</li>
              <li><strong>"User"</strong> refers to any individual who registers for and uses our Platform.</li>
              <li><strong>"Content"</strong> refers to all information, data, text, and materials available on our Platform.</li>
              <li><strong>"Healthcare Provider"</strong> refers to medical professionals who may access User data with permission.</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-green-600">2. Platform Use</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-medium mb-2">2.1 Account Registration</h3>
                <p>
                  To use certain features of our Platform, you must register and create an account. You agree to provide 
                  accurate, current, and complete information during registration and to update such information to keep 
                  it accurate, current, and complete.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium mb-2">2.2 Account Security</h3>
                <p>
                  You are responsible for maintaining the confidentiality of your account credentials and for all 
                  activities that occur under your account. You agree to notify us immediately of any unauthorized 
                  use of your account.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium mb-2">2.3 Acceptable Use</h3>
                <p>
                  You agree not to use the Platform to:
                </p>
                <ul className="list-disc ml-6 mt-2">
                  <li>Violate any applicable laws or regulations</li>
                  <li>Infringe upon the rights of others</li>
                  <li>Submit false or misleading information</li>
                  <li>Engage in unauthorized access or use of our systems</li>
                  <li>Interfere with the proper functioning of the Platform</li>
                </ul>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-green-600">3. Health Information and Disclaimer</h2>
            <div className="space-y-4">
              <p>
                DiabetesCare Kenya provides tools for diabetes management but is not a substitute for professional 
                medical advice, diagnosis, or treatment. Always seek the advice of qualified healthcare providers 
                with any questions regarding your medical condition.
              </p>
              <p>
                The predictive features and recommendations provided by our Platform are based on available data 
                and algorithms, and should be used as supplementary information only. We do not guarantee the 
                accuracy, completeness, or usefulness of any information provided through our Platform.
              </p>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-green-600">4. Intellectual Property</h2>
            <p>
              All content, features, and functionality of our Platform, including but not limited to text, 
              graphics, logos, icons, and software, are the exclusive property of DiabetesCare Kenya or its 
              licensors and are protected by copyright, trademark, and other intellectual property laws.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-green-600">5. User-Generated Content</h2>
            <p>
              By submitting content to our Platform, you grant DiabetesCare Kenya a worldwide, non-exclusive, 
              royalty-free license to use, reproduce, modify, and distribute such content for the purpose of 
              providing and improving our services.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-green-600">6. Termination</h2>
            <p>
              We reserve the right to suspend or terminate your access to our Platform at our sole discretion, 
              without notice, for conduct that we believe violates these Terms or is harmful to other Users, 
              us, or third parties, or for any other reason.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-green-600">7. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, DiabetesCare Kenya shall not be liable for any indirect, 
              incidental, special, consequential, or punitive damages, or any loss of profits or revenues, 
              whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible 
              losses, resulting from your use or inability to use the Platform.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-green-600">8. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of Kenya, without 
              regard to its conflict of law provisions.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-green-600">9. Changes to These Terms</h2>
            <p>
              We may update these Terms from time to time. We will notify you of any changes by posting the 
              new Terms on this page and updating the "Last updated" date.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-green-600">10. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at:
            </p>
            <div className="mt-2">
              <p>Email: legal@diabetescarekenya.co.ke</p>
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