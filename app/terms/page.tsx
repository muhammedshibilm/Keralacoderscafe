import Footer from "../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Kerala Coders Cafe",
  description: "Terms of Service for Kerala Coders Cafe community website.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] text-black pt-32 pb-24 relative overflow-hidden isolate">
      {/* Background patterns */}
      <div className="absolute inset-0 pointer-events-none -z-10 bg-[radial-gradient(#000_1.5px,transparent_1.5px)] [background-size:32px_32px] opacity-5" />

      <div className="mx-auto max-w-4xl px-6 md:px-12">
        <div className="border border-gray-100 bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm mb-12 relative overflow-hidden">
          <span className="inline-flex items-center gap-1.5 bg-[#ECFDF5] text-[#10B981] border border-[#A7F3D0] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
            Legal
          </span>
          <h1 className="text-[clamp(2rem,4vw,3.2rem)] font-black leading-tight tracking-tight text-slate-900 uppercase">
            Terms of <span className="text-[#00B9A5]">Service</span>
          </h1>
          <p className="mt-4 text-slate-500 font-semibold text-sm md:text-base leading-relaxed">
            Last Updated: July 15, 2026
          </p>

          <div className="mt-8 border-t border-gray-100 pt-8 prose prose-slate max-w-none font-medium text-slate-600 text-sm md:text-base leading-relaxed space-y-6">
            <h2 className="text-xl font-bold text-slate-800 uppercase tracking-tight pt-4">1. Agreement to Terms</h2>
            <p>
              By accessing and using our website at kcc.sh and participating in the Kerala Coders Cafe community, you agree to be bound by these Terms of Service. If you do not agree to all of these terms, please do not use the website or participate in community spaces.
            </p>

            <h2 className="text-xl font-bold text-slate-800 uppercase tracking-tight pt-4">2. Community Guidelines & Conduct</h2>
            <p>
              As a member or visitor of the Kerala Coders Cafe community, you agree to adhere to our community code of conduct, which includes:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Being respectful and inclusive of all members regardless of background or experience level.</li>
              <li>Not posting spam, malicious links, advertisements, or off-topic promotional content in community areas.</li>
              <li>Refraining from any form of harassment, hate speech, bullying, or abusive behavior.</li>
            </ul>

            <h2 className="text-xl font-bold text-slate-800 uppercase tracking-tight pt-4">3. Intellectual Property</h2>
            <p>
              All content hosted on this website, including but not limited to logos, branding, graphics, and text content, is the property of Kerala Coders Cafe unless otherwise stated. Projects shared on the website belong to their respective authors under their chosen open-source licenses.
            </p>
            <p>
              You may not use the branding, logo, or trademark of Kerala Coders Cafe without prior written permission from the community maintainers.
            </p>

            <h2 className="text-xl font-bold text-slate-800 uppercase tracking-tight pt-4">4. Third-Party Links & Services</h2>
            <p>
              Our website contains links to external websites, services, and Google Forms (for example, our Job Portal submission form, external job links, and chat platforms like WhatsApp). We are not responsible for the content, privacy policies, or practices of any third-party websites or services.
            </p>

            <h2 className="text-xl font-bold text-slate-800 uppercase tracking-tight pt-4">5. Disclaimer of Warranties</h2>
            <p>
              The website and all materials are provided "as is" and "as available" without any warranty of any kind, either express or implied. Kerala Coders Cafe does not guarantee that the service will be uninterrupted, secure, or free of errors, or that information displayed on the website (including job descriptions) is accurate or complete.
            </p>

            <h2 className="text-xl font-bold text-slate-800 uppercase tracking-tight pt-4">6. Limitation of Liability</h2>
            <p>
              In no event shall Kerala Coders Cafe, its maintainers, founders, or contributors be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of your access to or use of (or inability to use) this website or community resources.
            </p>

            <h2 className="text-xl font-bold text-slate-800 uppercase tracking-tight pt-4">7. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of India and the State of Kerala, without regard to its conflict of law provisions.
            </p>

            <h2 className="text-xl font-bold text-slate-800 uppercase tracking-tight pt-4">8. Modifications to Terms</h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms of Service at any time. We will post the revised terms on this page. Your continued use of the website following any changes constitutes acceptance of those changes.
            </p>

            <h2 className="text-xl font-bold text-slate-800 uppercase tracking-tight pt-4">9. Contact Us</h2>
            <p>
              If you have any questions about these Terms of Service, please reach out to us at <a href="mailto:keralacoderscafe@gmail.com" className="text-[#00B9A5] hover:underline">keralacoderscafe@gmail.com</a>.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
