import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

/**
 * Save contact form submission to Firestore
 * @param {Object} formData - Form data containing name, email, subject, message
 * @param {string} recaptchaToken - reCAPTCHA v3 token
 */
export const saveContactSubmission = async (formData, recaptchaToken) => {
  try {
    const docRef = await addDoc(collection(db, 'contactSubmissions'), {
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
      recaptchaToken: recaptchaToken,
      timestamp: serverTimestamp(),
      status: 'new'
    });
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

