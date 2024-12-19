const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <div className="prose max-w-none">
        <p className="mb-4">
          This Privacy Policy explains how Multiplier Ltd (trading as BornPurpose), of 71-75 Shelton Street, London, England, WC2H 9JQ collects, uses, and protects your personal information.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-4">Information We Collect</h2>
        <p className="mb-4">
          We collect and process the following types of personal information:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Contact information (name, email address)</li>
          <li>Account information</li>
          <li>Prayer requests and related voice data</li>
          <li>Usage data and analytics</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-4">How We Use Your Information</h2>
        <p className="mb-4">
          We use your personal information to:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Provide and improve our services</li>
          <li>Process and respond to prayer requests</li>
          <li>Store and process voice data related to prayer requests</li>
          <li>Communicate with you about our services</li>
          <li>Comply with legal obligations</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-4">Voice Data Processing</h2>
        <p className="mb-4">
          We collect and process voice data as part of our prayer request service. This data is:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Stored securely</li>
          <li>Used only for the purposes specified</li>
          <li>Retained only for as long as necessary</li>
          <li>Protected according to applicable data protection laws</li>
        </ul>

        <p className="mt-6">
          For any questions about this Privacy Policy, please contact us at george@bornpurpose.com
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;