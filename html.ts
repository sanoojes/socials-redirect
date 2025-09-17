import redirects from "./redirects";

function generateLinks() {
  return Object.keys(redirects)
    .map((path) => {
      const name = path.slice(1).charAt(0).toUpperCase() + path.slice(2);
      return `<li><a href="${path}" aria-label="Visit ${name}" rel="noopener noreferrer">${name}</a></li>`;
    })
    .join("\n");
}

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Connect with Sanooj on Discord, Twitter, Instagram, LinkedIn, and other social platforms.">
  <meta name="robots" content="index, follow">
  <link rel="icon" href="/favicon.ico" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap" rel="stylesheet">
  <title>Social Links for Sanooj | Connect on Social Media</title>
  <style>body { 
  font-family: 'Geist','Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
  display: flex; 
  flex-direction: column; 
  justify-content: center; 
  align-items: center; 
  min-height: 100vh; 
  margin: 0; 
  text-align: center; 
  background-color: #12140e; 
  color: #e2e3d8; 
}
h1 { 
  margin-bottom: 2rem; 
  font-size: 2.5rem; 
  color: #e2e3d8; 
}
ul { 
  list-style: none; 
  padding: 0; 
  display: flex; 
  flex-wrap: wrap; 
  gap: 1rem; 
  justify-content: center;
  max-width: 80vw;
}
li { 
  flex: 1 1 min(150px, 14vw);
}
a { 
  display: block;
  background-color: #404a33;
  color: #dce7c8; 
  text-decoration: none; 
  font-weight: bold; 
  padding: 1rem 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.3);
  transition: all 0.2s ease;
}
a:hover, a:focus { 
  transform: translateY(-4px);
  color: #404a33;
  background-color: #dce7c8; 
  box-shadow: 0 8px 12px rgba(0,0,0,0.5);
  text-decoration: none;
  outline: none;
}
footer {
  margin-top: 3rem;
  font-size: 0.9rem;
  color: #c5c8ba;
}</style>
</head>
<body>
  <header>
    <h1>Social Links for Sanooj</h1>
  </header>
  <main>
    <ul>${generateLinks()}</ul>
  </main>
  <footer>
    <p>&copy; ${new Date().getFullYear()} Sanooj. All rights reserved.</p>
  </footer>
</body>
</html>`;

export default html;
