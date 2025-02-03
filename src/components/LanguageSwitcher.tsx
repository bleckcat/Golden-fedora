import React from "react"
import { useAppDispatch, useAppSelector } from "../hooks/useRedux"
import { setLanguage } from "../redux/GlobalSlice"
import { IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material"
import { Language } from "@mui/icons-material"

const languages = [
  { label: "Portuguese", value: "pt" },
  { label: "English", value: "en" },
  { label: "Japanese", value: "jp" },
]
const LanguageSwitcher = () => {
  const dispatch = useAppDispatch()
  const language = useAppSelector((state) => state.global.language)
  const [anchorElLanguage, setAnchorElLanguage] =
    React.useState<null | HTMLElement>(null)

  const handleOpenLanguageMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElLanguage(event.currentTarget)
  }
  const handleCloseLanguageMenu = () => {
    setAnchorElLanguage(null)
  }

  const handleLanguageChange = (lang: string) => {
    dispatch(setLanguage(lang))
    handleCloseLanguageMenu()
  }

  return (
    <>
      <Tooltip title={`Translation in ${language}`} arrow>
        <IconButton
          onClick={handleOpenLanguageMenu}
          sx={{ p: 0 }}
          color="inherit"
        >
          <Language />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "35px" }}
        id="language-menu"
        anchorEl={anchorElLanguage}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElLanguage)}
        onClose={handleCloseLanguageMenu}
      >
        {languages.map((language) => (
          <MenuItem
            key={language.label}
            onClick={() => handleLanguageChange(language.value)}
          >
            <Typography sx={{ textAlign: "center" }}>
              {language.label}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

export default LanguageSwitcher
