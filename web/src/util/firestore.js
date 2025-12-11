import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

/**
 * Save contact form submission to Firestore
 * @param {Object} formData - Form data containing name, email, subject, message
 * @param {string} recaptchaToken - reCAPTCHA v3 token
 */
export const saveContactSubmission = async (formData, recaptchaToken) => {
  try {
    // Build submission object with all fields
    const submission = {
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      recaptchaToken: recaptchaToken,
      timestamp: serverTimestamp(),
      status: 'new'
    };

    // Add fields based on subject type
    if (formData.subject === 'general') {
      submission.message = formData.message;
    } else if (formData.subject === 'job') {
      submission.company = formData.company;
      submission.position = formData.position;
      submission.location = formData.location;
      submission.website = formData.website;
      submission.expectedStartDate = formData.expectedStartDate;
      submission.jobDescription = formData.jobDescription;
    } else if (formData.subject === 'project') {
      submission.budget = formData.budget;
      submission.timeline = formData.timeline;
      submission.projectDescription = formData.projectDescription;
    }

    const docRef = await addDoc(collection(db, 'contactSubmissions'), submission);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error saving contact submission:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Save CV download request to Firestore
 */
export const saveCVDownloadRequest = async (email) => {
  try {
    const docRef = await addDoc(collection(db, 'cvDownloadRequests'), {
      email: email,
      timestamp: serverTimestamp(),
      downloaded: true
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error saving CV download request:', error);
    return { success: false, error: error.message };
  }
};

