export const checkHealth = (req, res, next) => {
  res.status(200).json({
    isSuccess: true,
    message: "✔ Server is Running...",
  });
};
