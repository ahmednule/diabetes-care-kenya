import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function AboutPage() {
    return (
      <>
      <Header/>
      <div className="max-w-5xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-green-700 mb-8">DiabetesCare Kenya</h1>
        
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-green-600">Our Mission</h2>
          <p className="text-lg mb-6">
            At DiabetesCare Kenya, we're committed to transforming diabetes management for Kenyans through 
            technology, education, and personalized care. We believe that effective diabetes management 
            should be accessible to everyone, regardless of location or economic status.
          </p>
          <p className="text-lg">
            Founded in 2023 by a team of healthcare professionals and technology experts, DiabetesCare Kenya 
            was born out of the recognition that diabetes management in Kenya needed innovation and a 
            patient-centered approach.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-green-50 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-green-600">What We Offer</h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="mr-2 text-green-600">✓</span>
                <span className="text-black">Real-time glucose monitoring with smart analytics</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-green-600">✓</span>
                <span className="text-black">AI-driven personalized health recommendations</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-green-600">✓</span>
                <span className="text-black">Predictive risk assessment and early warnings</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-green-600">✓</span>
                <span className="text-black">Nutrition guidance tailored to Kenyan diets</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-green-600">✓</span>
                <span className="text-black">Connection to local healthcare providers</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-green-50 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-green-600">Our Approach</h2>
            <p className="mb-4 text-black">
              We combine cutting-edge technology with deep understanding of local healthcare challenges:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="mr-2 text-green-600">✓</span>
                <span className="text-black">Data-driven personalization for each patient</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-green-600">✓</span>
                <span className="text-black">Integration with Kenya's healthcare ecosystem</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-green-600">✓</span>
                <span className="text-black">Culturally relevant education and support</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-green-600">✓</span>
                <span className="text-black">Continuous improvement based on user outcomes</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-green-600">The Impact</h2>
          <p className="text-lg mb-4 text-white">
            Diabetes affects approximately 2.2% of Kenya's adult population, with many cases remaining 
            undiagnosed. DiabetesCare Kenya aims to:
          </p>
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <div className="bg-white p-5 rounded-lg border border-green-200 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">60%</div>
              <p className="text-black">Reduction in diabetes-related complications among our users</p>
            </div>
            <div className="bg-white p-5 rounded-lg border border-green-200 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">15,000+</div>
              <p className="text-black">Kenyans actively managing their diabetes through our platform</p>
            </div>
            <div className="bg-white p-5 rounded-lg border border-green-200 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">200+</div>
              <p className="text-black">Healthcare providers connected through our network</p>
            </div>
          </div>
        </div>
        
        <div className="bg-green-50 p-8 rounded-lg mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-green-600">Our Vision</h2>
          <p className="text-lg text-black">
            We envision a Kenya where diabetes is effectively managed through accessible technology, 
            with reduced complications and improved quality of life. We're working toward a future 
            where preventative care is the norm, and where data-driven healthcare bridges gaps in 
            the current system.
          </p>
        </div>
        
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-6 text-green-600">Join Us on Our Mission</h2>
          <p className="text-lg mb-6 text-white">
            Whether you're living with diabetes, a healthcare provider, or simply interested in our 
            work, we invite you to join our community and be part of the healthcare revolution in Kenya.
          </p>
          <a href="/contact" className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors">
            Get in Touch
          </a>
        </div>
      </div>
      <Footer/>
      </>
    );
  }
