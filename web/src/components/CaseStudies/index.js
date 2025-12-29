import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode } from '@fortawesome/free-solid-svg-icons';
import { caseStudyList } from '../../constants/caseStudyList';
import wordpressIcon from '../../assets/wplogo.svg';
import minecraftIcon from '../../assets/minecraft.png';
import { useNavigate } from 'react-router-dom';

export default function CaseStudies() {
  const navigate = useNavigate();
  return (
  <section id="case-studies">
    <div className="container">
      <div className="st-section-heading st-style1">
        <h4 className="st-section-heading-title">CASE STUDIES</h4>
        <h2 className="st-section-heading-subtitle">CASE STUDIES</h2>
      </div>
      </div>
      <div className="container">
      <div className="row">
        {caseStudyList.map((caseStudy, index) => (
        <div className="col-md-6" key={index}>
          <div className="st-iconbox st-iconbox-link st-style1" onClick={() => navigate(`/case-study/${caseStudy.id}`)}>
            <div className="st-iconbox-icon">
              {caseStudy.iconClass === 'faCode' && <FontAwesomeIcon icon={faCode} />}
              {caseStudy.iconClass === 'faWordpress' && <img className="st-wp-logo" src={wordpressIcon} alt="WordPress" />}
              {caseStudy.iconClass === 'faMinecraft' && <img className="st-minecraft-logo" src={minecraftIcon} alt="Minecraft" />}
            </div>
            <h2 className="st-iconbox-title">{caseStudy.title}</h2>
            <div className="st-iconbox-text">{caseStudy.description}</div>
            </div>
            <div className="st-height-b30 st-height-lg-b30"></div>
          </div>
        ))}
      </div>
    </div>
  </section>
  );
}