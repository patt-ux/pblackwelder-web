import React from 'react';
import ProgressBar from '../ProgressBar';

const skills = [
  { title: 'React', percent: 95 },
  { title: 'Node.js', percent: 90 },
  { title: 'PHP', percent: 70 },
  { title: 'Python', percent: 70 },
  { title: 'Golang', percent: 70 },
  { title: 'C#', percent: 70 },
  { title: '.NET ', percent: 70 },
  { title: 'HTML/CSS Wizardry', percent: 95 },
  { title: 'SQL', percent: 70 },
  { title: 'GCP', percent: 80 },
];

const Skills = () => (
  <section id="skills" className="st-dark-bg">
    <div className="st-height-b100 st-height-lg-b80"></div>
    <div className="container">
      <div className="st-section-heading st-style1">
        <h4 className="st-section-heading-title">MY SKILLS</h4>
        <h2 className="st-section-heading-subtitle">MY SKILLS</h2>
      </div>
      <div className="st-height-b25 st-height-lg-b25"></div>
    </div>
    <div className="container">
      <div className="row">
        <div className="col-lg-6">
          <div className="st-skill-wrap">
            <div className="st-skill-heading">
              <h2 className="st-skill-title">Skills, Programming Languages, and Tools</h2>
              <div className="st-skill-subtitle">
                Technical stack and toolset utilized in developing, deploying, and maintaining cloud-native and enterprise applications.
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="st-height-b0 st-height-lg-b30"></div>
          <div className="st-progressbar-wrap">
            {skills.map(skill => (
              <React.Fragment key={skill.title}>
                <ProgressBar title={skill.title} percent={skill.percent} />
                <div className="st-height-b30 st-height-lg-b20"></div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
    <div className="st-height-b95 st-height-lg-b75"></div>
  </section>
);

export default Skills;