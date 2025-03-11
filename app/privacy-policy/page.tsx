import Link from "next/link"
import { ArrowLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Button variant="ghost" asChild className="mb-6">
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </Button>

      <h1 className="text-3xl font-bold mb-6 text-orange-400">Privacy Policy</h1>

      <div className="space-y-6">
        {/* <section>
          <h2 className="text-2xl font-semibold mb-3">1. Introduction</h2>
          <p>
            WordReach Bible Translation ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or make a donation.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">2. Information We Collect</h2>
          <p>We collect information that you provide directly to us, such as:</p>
          <ul className="list-disc pl-6 mt-2">
            <li>Personal information (e.g., name, email address, phone number)</li>
            <li>Donation information (e.g., amount, frequency, payment details)</li>
            <li>Communication preferences</li>
            <li>Any other information you choose to provide</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">3. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul className="list-disc pl-6 mt-2">
            <li>Process donations and send receipts</li>
            <li>Communicate with you about our work and impact</li>
            <li>Respond to your inquiries and requests</li>
            <li>Improve our website and services</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">4. Information Sharing and Disclosure</h2>
          <p>
            We do not sell or rent your personal information to third parties. We may share your information with trusted service providers who assist us in operating our website, conducting our business, or servicing you.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">5. Data Security</h2>
          <p>
            We implement a variety of security measures to maintain the safety of your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure, so we cannot guarantee absolute security.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">6. Your Choices</h2>
          <p>
            You can choose not to provide certain information, but this may limit your ability to engage with some of our services. You can also opt-out of receiving promotional communications from us by following the instructions in those messages.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">7. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">8. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <address className="mt-2 not-italic">
            WordReach Bible Translation<br />
            123 Translation Way<br />
            Dallas, TX 75001<br />
            Email: privacy@wordreach.org<br />
            Phone: (555) 123-4567
          </address>
        </section> */}

        <section>
            <h2></h2>
            <p className="text-justify">At BAHTRAKU, we prioritize your privacy and the security of your personal information. We collect your name and email address to communicate with you regarding your donation and to provide updates about our mission. Your payment details are securely processed through a trusted payment gateway, and we do not store your full credit card information on our servers. We implement strict security measures to protect your data from unauthorized access. If you have any questions about our privacy practices, please contact us at information@bahtraku.org</p>
        </section>

        {/* <p className="text-sm text-muted-foreground">
          Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p> */}
      </div>
    </div>
  )
}
