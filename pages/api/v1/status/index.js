function status(request, response) {
  response.status(200).json({ message: "All is fine" });
}

export default status;
