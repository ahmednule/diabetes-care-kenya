import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function ContactPage() {
    return (
      <>
      <Header/>
      <div className="max-w-5xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center text-green-700 mb-8">Contact Us</h1>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-semibold mb-6 text-green-600">Get in Touch</h2>
            <p className="mb-6">
              Have questions about DiabetesCare Kenya? We're here to help. 
              Fill out the form or reach out to us directly using the contact information below.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <div className="bg-green-100 p-2 rounded-full mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p>info@diabetescarekenya.co.ke</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-green-100 p-2 rounded-full mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">Phone</h3>
                  <p>+254 112291829</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-green-100 p-2 rounded-full mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">Address</h3>
                  <p>Westlands Business Park</p>
                  <p>Waiyaki Way, Nairobi</p>
                  <p>Kenya</p>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-green-600">Office Hours</h2>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="grid grid-cols-2 gap-2 text-black">
                  <div>Monday - Friday:</div>
                  <div>8:00 AM - 6:00 PM</div>
                  <div>Saturday:</div>
                  <div>9:00 AM - 2:00 PM</div>
                  <div>Sunday:</div>
                  <div>Closed</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-6 text-green-600">Send us a Message</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500" 
                  placeholder="Your full name" 
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500" 
                  placeholder="Your email address" 
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone Number</label>
                <input 
                  type="tel" 
                  id="phone" 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500" 
                  placeholder="Your phone number" 
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-1">Subject</label>
                <select 
                  id="subject" 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                >
                  <option value="">Select a subject</option>
                  <option value="support">Technical Support</option>
                  <option value="billing">Billing Inquiry</option>
                  <option value="partnership">Partnership Opportunity</option>
                  <option value="feedback">Feedback</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
                <textarea 
                  id="message" 
                  rows={5}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500" 
                  placeholder="How can we help you?"
                ></textarea>
              </div>
              
              <div className="flex items-start">
                <input 
                  id="privacy" 
                  type="checkbox" 
                  className="mt-1 h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500" 
                />
                <label htmlFor="privacy" className="ml-2 block text-sm text-gray-700">
                  I agree to the <a href="/privacy" className="text-green-600 hover:underline">Privacy Policy</a> and consent to the processing of my personal data.
                </label>
              </div>
              
              <button 
                type="submit" 
                className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
        
        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-6 text-green-600 text-center">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-6 text-black">
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="font-medium text-lg mb-2">How do I get started with DiabetesCare Kenya?</h3>
              <p>Simply download our app from the App Store or Google Play, create an account, and follow the setup guide to connect your glucose monitoring devices.</p>
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="font-medium text-lg mb-2">Is my medical data secure?</h3>
              <p>Yes, we adhere to international healthcare data protection standards and comply with the Data Protection Act of Kenya. All your medical data is encrypted.</p>
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="font-medium text-lg mb-2">Can my doctor access my diabetes data?</h3>
              <p>Yes, you can invite your healthcare providers to view your data through a secure provider portal, giving them insights into your diabetes management.</p>
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="font-medium text-lg mb-2">Do you offer customer support?</h3>
              <p>We provide 24/7 customer support via chat in the app, and our team is available by phone during business hours to assist with any questions.</p>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
      </>
    );
  }