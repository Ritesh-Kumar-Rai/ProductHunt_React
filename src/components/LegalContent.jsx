import legalContentCSS from './LegalContent.module.css';

// The JSX for Legal Docs

const PrivacyPolicyText = (
    <>
        <h4 className={legalContentCSS.legalContenth4}> Introduction </h4>
        <p className={`${legalContentCSS.legalContentp} text-slate-700 dark:text-slate-500`}>This portfolio project is built for demonstration and learning purposes. It is not a commercial application. The site does not actively collect, store, or share personal information. </p>

        <h4 className={legalContentCSS.legalContenth4}> Information Collection </h4>
        <ul className={`${legalContentCSS.legalContentul} text-slate-700 dark:text-slate-500`}>
            <li><b>Automatically collected data:</b> None. This project does not use cookies, trackers, or analytics.</li>
            <li><b>User-provided data:</b> If you submit information (e.g., name, email in a demo login form), it is used only for demonstration and not stored in a database.</li>
        </ul>

        <h4 className={legalContentCSS.legalContenth4}> Use of Information</h4>
        <p className={`${legalContentCSS.legalContentp} text-slate-700 dark:text-slate-500`}>Any data entered is used solely to demonstrate functionality (e.g., adding items to a cart). It is not shared with third parties or used for marketing.</p>

        <h4 className={legalContentCSS.legalContenth4}> Third-Party Services </h4>
        <p className={`${legalContentCSS.legalContentp} text-slate-700 dark:text-slate-500`}>If this project integrates external APIs (e.g., product listings, payment gateway mock), those services may have their own privacy policies. This project does not control or manage those policies.</p>

        <h4 className={legalContentCSS.legalContenth4}> Security </h4>
        <p className={`${legalContentCSS.legalContentp} text-slate-700 dark:text-slate-500`}>This project is not intended for production use. While basic security practices are followed, no guarantees are made regarding data protection.</p>

        <h4 className={legalContentCSS.legalContenth4}> Changes to Policy </h4>
        <p className={`${legalContentCSS.legalContentp} text-slate-700 dark:text-slate-500`}>This Privacy Policy may be updated as the project evolves. Updates will be reflected here.</p>

        <h4 className={legalContentCSS.legalContenth4}> Contact </h4>
        <p className={`${legalContentCSS.legalContentp} text-slate-700 dark:text-slate-500`}>For questions, please contact: <b>riteshkumarrai.dev@outlook.com</b> </p>
    </>);

const TermsConditionsText = (
    <>
        <h4 className={legalContentCSS.legalContenth4}> Acceptance of Terms </h4>
        <p className={`${legalContentCSS.legalContentp} text-slate-700 dark:text-slate-500`}>By accessing this website, you agree to these Terms & Conditions. If you do not agree, please discontinue use.</p>

        <h4 className={legalContentCSS.legalContenth4}> Use of the Website </h4>
        <p className={`${legalContentCSS.legalContentp} text-slate-700 dark:text-slate-500`}>This site is for **educational and demonstration purposes only**. All products, transactions, and data shown are mock examples and do not represent real services.</p>

        <h4 className={legalContentCSS.legalContenth4}> Intellectual Property </h4>
        <p className={`${legalContentCSS.legalContentp} text-slate-700 dark:text-slate-500`}>The design, code, and content of this project are created by Ritesh Kumar Rai. You may view and reference the project, but reproduction or reuse without permission is prohibited.</p>

        <h4 className={legalContentCSS.legalContenth4}> Limitations of Liability </h4>
        <p className={`${legalContentCSS.legalContentp} text-slate-700 dark:text-slate-500`}>This project is provided "as is" without warranties. The creator is not responsible for any issues, damages, or losses arising from use of the demo.</p>

        <h4 className={legalContentCSS.legalContenth4}> Changes to Terms </h4>
        <p className={`${legalContentCSS.legalContentp} text-slate-700 dark:text-slate-500`}>These Terms & Conditions may be updated as the project evolves. Updates will be reflected here.</p>

        <h4 className={legalContentCSS.legalContenth4}> Contact </h4>
        <p className={`${legalContentCSS.legalContentp} text-slate-700 dark:text-slate-500`}>For inquiries, please contact: <b>riteshkumarrai.dev@outlook.com</b></p>
    </>
);


export { PrivacyPolicyText, TermsConditionsText }