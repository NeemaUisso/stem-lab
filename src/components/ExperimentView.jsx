import React from 'react';

const ExperimentView = () => {
  const experiment = {
    title: "Investigation of Archimedes' Principle and Law of Flotation",
    subtitle: "Exploring Archimedes’ Principle and Law of Floatation",
    objective: [
      "Demonstrate that a body submerged in a fluid experiences an upward buoyant force equal to the weight of the fluid it displaces (Archimedes’ Principle).",
      "Understand how an object floats when its weight is balanced by the buoyant force (Law of Floatation)."
    ],
    materials: [
      "Measuring cylinder or graduated container",
      "Water",
      "Small solid block (wood, metal, or plastic)",
      "Spring balance",
      "Weighing scale (optional)",
      "String",
      "Overflow can or large beaker",
      "Collecting vessel"
    ],
    description:
      "Archimedes’ Principle states that when an object is fully or partially submerged in a fluid, it is pushed upward by a force equal to the weight of the fluid it displaces. The Law of Floatation expands on this by showing that an object will float if its weight equals the weight of the displaced fluid. These principles explain why ships float and why objects feel lighter underwater.",
    procedures: {
      partA: [
        "Tie the solid block with a string and measure its weight in air using the spring balance.",
        "Fill the overflow can with water until it begins to spill out.",
        "Place a collecting vessel under the spout to catch overflowing water.",
        "Submerge the block completely into the water.",
        "Measure the new weight of the block while underwater using the spring balance.",
        "Measure the volume of collected water using the graduated container.",
        "Calculate the weight of the displaced water using: Weight = Volume × Density of water (typically 1 g/cm³ or 1000 kg/m³).",
        "Compare the weight lost by the block to the weight of the displaced water—they should be nearly equal."
      ],
      partB: [
        "Place a wooden block on the water surface.",
        "Observe how much of the block stays above the water.",
        "Mark and measure the volume of the submerged part.",
        "Calculate the weight of the water displaced.",
        "Compare it to the weight of the wooden block—the values should match, confirming floatation."
      ]
    }
  };

  return (
    <div className="container mt-5 mb-5 pt-5">
      <div className="card shadow-sm p-4">
        <h2 className="text-primary">{experiment.title}</h2>
        <h5 className="text-muted mb-4">{experiment.subtitle}</h5>

        <section className="mb-4">
          <h4>Objective</h4>
          <ul>
            {experiment.objective.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="mb-4">
          <h4>Materials Needed</h4>
          <ul>
            {experiment.materials.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="mb-4">
          <h4>Description</h4>
          <p>{experiment.description}</p>
        </section>

        <section className="mb-4">
          <h4>Procedure</h4>
          <h5 className="mt-3">A. Demonstrating Archimedes’ Principle</h5>
          <ol>
            {experiment.procedures.partA.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>

          <h5 className="mt-4">B. Demonstrating the Law of Floatation</h5>
          <ol>
            {experiment.procedures.partB.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  );
};

export default ExperimentView;
