import EducationDetailForm from 'components/Candidate/ProfileDetails/educationDetailForm';
import ExperienceDetailForm from 'components/Candidate/ProfileDetails/experienceDetailForm';
import PersonalDetailForm from 'components/Candidate/ProfileDetails/personalDetailForm';
import useTranslation from 'next-translate/useTranslation';
import Steps, { Step } from 'rc-steps';
import React, { useState } from 'react';

const CompanyProfile = () => {
    const [activeStep, setActiveStep] = useState(0);
    const { t: languageTranslater } = useTranslation('auth');

    return (
        <AuthWrapper className="bg-accent">
            <div className="flex w-full px-6 sm:px-0">
                <div className="container mx-auto mt-12">
                    <h3 className="my-4 text-xl font-bold text-center">
                        {languageTranslater('welcome')}
                    </h3>
                    <Steps
                        direction="horizontal"
                        current={activeStep}
                        status=""
                        onChange={setActiveStep}
                    >
                        <Step title="PERSONAL DETAILS" step={0} />
            
                        <Step
                            title="EDUCATION"
                            step={1}
                            onNext={() => setActiveStep(2)}
                        />
            
                        <Step title="EXPERIENCE" step={2} />
                    </Steps>
                    {Boolean(activeStep === 0) && (
                        <PersonalDetailForm onNext={() => setActiveStep(1)} />
                    )}
                    {Boolean(activeStep === 1) && (
                        <EducationDetailForm onNext={() => setActiveStep(2)} />
                    )}
                    {Boolean(activeStep === 2) && <ExperienceDetailForm />}
                </div>
            </div>
        </AuthWrapper>
    );
};
export default CompanyProfile;
