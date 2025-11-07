let Assignment = require("../model/assignment");

// Récupérer tous les assignments (GET)
function getAssignments(req, res) {
  Assignment.find((err, assignments) => {
    if (err) {
      res.send(err);
    }

    // Mapper "nom" vers "nomDevoir" pour le frontend
    const assignmentsFormatted = assignments.map((assignment) => ({
      ...assignment.toObject(),
      nomDevoir: assignment.nom,
    }));

    res.send(assignmentsFormatted);
  });
}

// Récupérer un assignment par son id (GET)
function getAssignment(req, res) {
  let assignmentId = req.params.id;

  Assignment.findOne({ id: assignmentId }, (err, assignment) => {
    if (err) {
      res.send(err);
      return;
    }

    if (!assignment) {
      res.status(404).json({ message: "Assignment not found" });
      return;
    }

    // Mapper "nom" vers "nomDevoir" pour le frontend
    const assignmentFormatted = {
      ...assignment.toObject(),
      nomDevoir: assignment.nom,
    };

    res.json(assignmentFormatted);
  });
}

// Ajout d'un assignment (POST)
function postAssignment(req, res) {
  let assignment = new Assignment();
  assignment.id = req.body.id;
  assignment.nom = req.body.nomDevoir || req.body.nom; // Accepter nomDevoir du frontend
  assignment.dateDeRendu = req.body.dateDeRendu;
  assignment.rendu = req.body.rendu;

  console.log("POST assignment reçu :");
  console.log(assignment);

  assignment.save((err) => {
    if (err) {
      res.send("cant post assignment ", err);
    }
    res.json({ message: `${assignment.nom} saved!` });
  });
}

// Update d'un assignment (PUT)
function updateAssignment(req, res) {
  console.log("UPDATE recu assignment : ");
  console.log(req.body);

  // Mapper nomDevoir vers nom si nécessaire
  const updateData = {
    ...req.body,
    nom: req.body.nomDevoir || req.body.nom,
  };

  Assignment.findByIdAndUpdate(
    req.body._id,
    updateData,
    { new: true },
    (err, assignment) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.json({ message: "updated" });
      }

      // console.log('updated ', assignment)
    }
  );
}

// suppression d'un assignment (DELETE)
function deleteAssignment(req, res) {
  Assignment.findOneAndDelete({ id: req.params.id }, (err, assignment) => {
    if (err) {
      res.send(err);
      return;
    }
    if (!assignment) {
      res.status(404).json({ message: "Assignment not found" });
      return;
    }
    res.json({ message: `${assignment.nom} deleted` });
  });
}

module.exports = {
  getAssignments,
  postAssignment,
  getAssignment,
  updateAssignment,
  deleteAssignment,
};
