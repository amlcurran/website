
class Styling {
  static primaryColor = "var(--primary)"
  static secondaryColor = "var(--secondary)"
  static cardBackground = "var(--surface)"

  static talks = {
    textColor: "var(--text-on-secondary)" 
  }

  static bigButtons = {
    background: "white",
    color: Styling.primaryColor
  }

  static bigButtonHover = {
    background: '#FFFFFF66',
    color: 'white'
  }

  static onPrimary = {
    text: "var(--text-on-primary)"
  }

  static onBackground = {
    text: "var(--text-on-background)"
  }

  static card = {
    cornerRadius: 8
  }
}

export default Styling