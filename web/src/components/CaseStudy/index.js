import React from 'react';
import { caseStudyList } from '../../constants/caseStudyList';
import { useNavigate } from 'react-router-dom';
import { getTechBadge } from '../../constants/techStackIcons';
export default function CaseStudy({ itemData } ) {
  const navigate = useNavigate();
  return (
    <section className="st-style1" id="top">
        <div className="st-height-b100 st-height-lg-b80"></div>
      <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="st-section-heading st-style1">
                        <h2 className="st-section-heading-title">{itemData.title}</h2>
                    </div>
                </div>
                    <div className="st-post-details st-style1">
                        <h3>Problem</h3>
                        <div className="st-post-info st-mb30">
                            <div dangerouslySetInnerHTML={{ __html: itemData.problem }} />
                        </div>
                        <h3>Constraints</h3>
                        <div className="st-post-info st-mb30">
                            <ul>
                                {itemData.constraints.map((constraint, index) => (
                                    <li key={index}>{constraint}</li>
                                ))}
                            </ul>
                        </div>
                        <h3>Solution</h3>
                        <div className="st-post-info st-mb30">
                            <div dangerouslySetInnerHTML={{ __html: itemData.solution }} />
                        </div>
                        <h3>Architecture</h3>
                        <div className="st-post-info st-mb30">
                            <img src={itemData.architectureDiagram} alt={itemData.title} />
                            <p>{itemData.architecture}</p>
                        </div>
                        <h3>Key Decisions</h3>
                        <div className="st-post-info st-mb30">
                            <ul>
                                {itemData.keyDecisions.map((decision, index) => (
                                    <li key={index}>{decision}</li>
                                ))}
                            </ul>
                        </div>
                        <h3>Outcome</h3>
                        <div className="st-post-info st-mb30">
                            <ul>
                                {itemData.outcome.map((outcome, index) => (
                                    <li key={index}>{outcome}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="st-post-meta">
                    <div className="st-post-tages">
                    <h4 className="st-post-tage-title">Tech Stack:</h4>
                    <ul className="st-post-tage-list st-mp0">
                        {itemData.techStack.map((tech, index) => (
                            <li key={index}>{getTechBadge(tech)}</li>
                        ))}
                    </ul>
                    </div>
                </div>
                </div>
            </div>
        </div>
        <div className="st-mb30"></div>
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="st-section-heading st-style1">
                        <h2 className="st-section-heading-title">Other Case Studies</h2>
                    </div>
                </div>
                <div className="case-study-links">
                {caseStudyList.filter(item => item.id !== itemData.id).map((caseStudy, index) => (
                    <div className="st-case-study-link" key={index} onClick={() => navigate(`/case-study/${caseStudy.id}`)}>
                            {caseStudy.title}
                    </div>
                ))}
                </div>
            </div>
      </div>
      <div className="st-height-b95 st-height-lg-b75"></div>
    </section>
  );
}