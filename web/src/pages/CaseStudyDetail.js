import React, { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import CaseStudy from '../components/CaseStudy';
import { caseStudyList } from '../constants/caseStudyList';

function CaseStudyDetail() {
  const { id } = useParams();
  
  // Scroll to top when component mounts or ID changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);
  
  // Find the case study by ID
  const caseStudy = caseStudyList.find(item => item.id === id);
  
  // If case study not found, redirect to home (or show 404)
  if (!caseStudy) {
    return <Navigate to="/" replace />;
  }
  
  return <CaseStudy itemData={caseStudy} />;
}

export default CaseStudyDetail;

