import { Box, styled } from "@mui/material"

const BackgroundContainer = styled(Box)(() => ({
  position: "relative",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  minHeight: "calc(100vh - 64px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-around",
}))

export const JaseBloorBackground = styled(BackgroundContainer)(() => ({
  backgroundImage: "url('/jase-bloor.jpg')",
}))

export const ManuelCosentinoBackground = styled(BackgroundContainer)(() => ({
  backgroundImage: "url('/manuel-cosentino.jpg')",
}))

export const DegradeBackgroundOverlay = styled(Box)(() => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background:
    "linear-gradient(0deg, rgba(36,0,0,0.40044584728422616) 0%, rgba(121,9,9,0.2463842226343662) 25%, rgba(255,0,0,0) 100%)",
}))
