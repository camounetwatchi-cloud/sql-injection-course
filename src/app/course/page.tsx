import Link from "next/link";

export default function CoursePage() {
    return (
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
            {/* Course Header */}
            <header style={{ textAlign: "center", marginBottom: "3rem" }}>
                <h1 style={{
                    fontSize: "3rem",
                    fontWeight: 800,
                    background: "linear-gradient(135deg, #ef4444, #a855f7, #00ff88)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    marginBottom: "1rem"
                }}>
                    🔓 SQL Injection Masterclass
                </h1>
                <p style={{
                    fontSize: "1.25rem",
                    color: "#a1a1aa",
                    maxWidth: "700px",
                    margin: "0 auto"
                }}>
                    Apprenez comment fonctionnent les injections SQL, pratiquez sur un vrai site vulnérable,
                    et découvrez comment protéger vos applications.
                </p>
            </header>

            {/* Table of Contents */}
            <nav className="card" style={{ marginBottom: "3rem" }}>
                <h2 style={{ marginBottom: "1rem" }}>📚 Table des Matières</h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "0.5rem" }}>
                    {[
                        { id: "module-1", title: "Qu'est-ce qu'une SQL Injection ?", icon: "🎯" },
                        { id: "module-2", title: "Comment ça marche ?", icon: "⚙️" },
                        { id: "module-3", title: "Stack Technique", icon: "🏗️" },
                        { id: "module-4", title: "Exercices Pratiques", icon: "💻" },
                        { id: "module-5", title: "Comment se Protéger", icon: "🛡️" },
                        { id: "module-6", title: "Challenge Final", icon: "🏆" }
                    ].map((module) => (
                        <a
                            key={module.id}
                            href={`#${module.id}`}
                            style={{
                                padding: "0.75rem 1rem",
                                background: "rgba(15, 15, 25, 0.5)",
                                borderRadius: "8px",
                                color: "#e4e4e7",
                                textDecoration: "none",
                                transition: "all 0.3s ease"
                            }}
                        >
                            {module.icon} {module.title}
                        </a>
                    ))}
                </div>
            </nav>

            {/* Module 1 */}
            <section id="module-1" className="card" style={{ marginBottom: "2rem" }}>
                <h2 style={{
                    fontSize: "1.75rem",
                    marginBottom: "1.5rem",
                    paddingBottom: "0.75rem",
                    borderBottom: "2px solid rgba(168, 85, 247, 0.3)"
                }}>
                    🎯 Module 1 : Qu&apos;est-ce qu&apos;une SQL Injection ?
                </h2>

                <h3 style={{ color: "#a855f7", marginBottom: "1rem" }}>Définition</h3>
                <p style={{ marginBottom: "1.5rem", lineHeight: 1.8 }}>
                    Une <strong>SQL Injection</strong> (SQLi) est une vulnérabilité de sécurité qui permet à un attaquant
                    d&apos;interférer avec les requêtes qu&apos;une application effectue vers sa base de données.
                    C&apos;est comme si vous parliez à un traducteur qui exécute <em>littéralement</em> tout ce que vous dites,
                    sans vérifier si c&apos;est une demande légitime.
                </p>

                <div className="terminal" style={{ marginBottom: "1.5rem" }}>
                    <div className="terminal-header">
                        <div className="terminal-dot red"></div>
                        <div className="terminal-dot yellow"></div>
                        <div className="terminal-dot green"></div>
                        <span style={{ marginLeft: "1rem", color: "#6b7280" }}>Analogie</span>
                    </div>
                    <p style={{ margin: "1rem 0", padding: "0 0.5rem" }}>
                        💬 <strong>Utilisateur normal :</strong> &quot;Je voudrais le profil de alice&quot;<br />
                        ➡️ <code>SELECT * FROM users WHERE name = &apos;alice&apos;</code><br /><br />

                        💀 <strong>Attaquant :</strong> &quot;Je voudrais le profil de alice&apos; OR &apos;1&apos;=&apos;1&quot;<br />
                        ➡️ <code>SELECT * FROM users WHERE name = &apos;alice&apos; <span style={{ color: "#ef4444" }}>OR &apos;1&apos;=&apos;1&apos;</span></code><br />
                        ➡️ Retourne TOUS les utilisateurs !
                    </p>
                </div>

                <h3 style={{ color: "#a855f7", marginBottom: "1rem" }}>Cas célèbres</h3>
                <div style={{ display: "grid", gap: "1rem", marginBottom: "1.5rem" }}>
                    {[
                        { year: "2008", company: "Heartland Payment Systems", loss: "130 millions de cartes volées" },
                        { year: "2011", company: "Sony PlayStation Network", loss: "77 millions de comptes exposés" },
                        { year: "2015", company: "TalkTalk", loss: "157 000 clients affectés, £77M d'amende" },
                        { year: "2019", company: "Fortnite", loss: "Comptes utilisateurs compromis" }
                    ].map((incident, i) => (
                        <div key={i} style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "1rem",
                            padding: "0.75rem",
                            background: "rgba(239, 68, 68, 0.1)",
                            borderRadius: "8px",
                            borderLeft: "3px solid #ef4444"
                        }}>
                            <span style={{ color: "#ef4444", fontWeight: 700 }}>{incident.year}</span>
                            <span style={{ fontWeight: 600 }}>{incident.company}</span>
                            <span style={{ color: "#a1a1aa", fontSize: "0.9rem" }}>{incident.loss}</span>
                        </div>
                    ))}
                </div>

                <h3 style={{ color: "#a855f7", marginBottom: "1rem" }}>Impact potentiel</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "1rem" }}>
                    {[
                        { icon: "🔓", title: "Bypass Auth", desc: "Contourner la connexion" },
                        { icon: "📊", title: "Vol de données", desc: "Extraire toute la base" },
                        { icon: "✏️", title: "Modification", desc: "Altérer les données" },
                        { icon: "💣", title: "Destruction", desc: "DROP TABLE users" },
                        { icon: "🖥️", title: "Shell", desc: "Exécution de code" }
                    ].map((impact, i) => (
                        <div key={i} style={{
                            textAlign: "center",
                            padding: "1rem",
                            background: "rgba(15, 15, 25, 0.5)",
                            borderRadius: "8px"
                        }}>
                            <div style={{ fontSize: "2rem" }}>{impact.icon}</div>
                            <div style={{ fontWeight: 600, marginTop: "0.5rem" }}>{impact.title}</div>
                            <div style={{ fontSize: "0.85rem", color: "#6b7280" }}>{impact.desc}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Module 2 */}
            <section id="module-2" className="card" style={{ marginBottom: "2rem" }}>
                <h2 style={{
                    fontSize: "1.75rem",
                    marginBottom: "1.5rem",
                    paddingBottom: "0.75rem",
                    borderBottom: "2px solid rgba(0, 255, 136, 0.3)"
                }}>
                    ⚙️ Module 2 : Comment ça marche ?
                </h2>

                <h3 style={{ color: "#00ff88", marginBottom: "1rem" }}>Anatomie d&apos;une requête vulnérable</h3>
                <div className="code-block" style={{ marginBottom: "1.5rem" }}>
                    <pre style={{ margin: 0 }}>
                        <span className="syntax-comment">// ❌ Code VULNÉRABLE - Ne jamais faire ça !</span>{"\n"}
                        <span className="syntax-keyword">const</span> query = <span className="syntax-string">`SELECT * FROM users WHERE username = &apos;$&#123;username&#125;&apos;`</span>;{"\n\n"}
                        <span className="syntax-comment">// ✅ Code SÉCURISÉ - Toujours utiliser des paramètres</span>{"\n"}
                        <span className="syntax-keyword">const</span> query = <span className="syntax-string">&apos;SELECT * FROM users WHERE username = $1&apos;</span>;{"\n"}
                        <span className="syntax-keyword">const</span> result = <span className="syntax-keyword">await</span> db.<span className="syntax-function">query</span>(query, [username]);
                    </pre>
                </div>

                <h3 style={{ color: "#00ff88", marginBottom: "1rem" }}>Types d&apos;injections SQL</h3>
                <div style={{ display: "grid", gap: "1rem", marginBottom: "1.5rem" }}>
                    <div style={{
                        padding: "1rem",
                        background: "rgba(0, 255, 136, 0.1)",
                        borderRadius: "8px",
                        borderLeft: "3px solid #00ff88"
                    }}>
                        <h4 style={{ color: "#00ff88" }}>1. In-Band (Classic)</h4>
                        <p style={{ color: "#a1a1aa", margin: "0.5rem 0" }}>
                            Le résultat de l&apos;injection est directement visible dans la réponse.
                        </p>
                        <code style={{ color: "#e4e4e7" }}>&apos; OR &apos;1&apos;=&apos;1</code> → Affiche tous les résultats
                    </div>

                    <div style={{
                        padding: "1rem",
                        background: "rgba(168, 85, 247, 0.1)",
                        borderRadius: "8px",
                        borderLeft: "3px solid #a855f7"
                    }}>
                        <h4 style={{ color: "#a855f7" }}>2. UNION-based</h4>
                        <p style={{ color: "#a1a1aa", margin: "0.5rem 0" }}>
                            Combine les résultats avec une autre table pour extraire des données.
                        </p>
                        <code style={{ color: "#e4e4e7" }}>&apos; UNION SELECT username, password FROM users--</code>
                    </div>

                    <div style={{
                        padding: "1rem",
                        background: "rgba(239, 68, 68, 0.1)",
                        borderRadius: "8px",
                        borderLeft: "3px solid #ef4444"
                    }}>
                        <h4 style={{ color: "#ef4444" }}>3. Blind Injection</h4>
                        <p style={{ color: "#a1a1aa", margin: "0.5rem 0" }}>
                            Aucun résultat visible, mais on peut déduire des informations par le comportement (temps, erreurs).
                        </p>
                        <code style={{ color: "#e4e4e7" }}>&apos; AND SUBSTRING(password,1,1)=&apos;a</code> → True/False selon le caractère
                    </div>
                </div>

                <h3 style={{ color: "#00ff88", marginBottom: "1rem" }}>Syntaxe de commentaires par SGBD</h3>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                        <tr style={{ borderBottom: "1px solid rgba(100, 100, 120, 0.3)" }}>
                            <th style={{ padding: "0.75rem", textAlign: "left", color: "#a855f7" }}>SGBD</th>
                            <th style={{ padding: "0.75rem", textAlign: "left", color: "#a855f7" }}>Commentaire ligne</th>
                            <th style={{ padding: "0.75rem", textAlign: "left", color: "#a855f7" }}>Commentaire bloc</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[
                            { db: "MySQL", line: "-- ou #", block: "/* */" },
                            { db: "PostgreSQL", line: "--", block: "/* */" },
                            { db: "SQL Server", line: "--", block: "/* */" },
                            { db: "Oracle", line: "--", block: "/* */" },
                            { db: "SQLite", line: "--", block: "/* */" }
                        ].map((row, i) => (
                            <tr key={i} style={{ borderBottom: "1px solid rgba(100, 100, 120, 0.1)" }}>
                                <td style={{ padding: "0.75rem", fontWeight: 600 }}>{row.db}</td>
                                <td style={{ padding: "0.75rem" }}><code style={{ color: "#00ff88" }}>{row.line}</code></td>
                                <td style={{ padding: "0.75rem" }}><code style={{ color: "#00ff88" }}>{row.block}</code></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            {/* Module 3 */}
            <section id="module-3" className="card" style={{ marginBottom: "2rem" }}>
                <h2 style={{
                    fontSize: "1.75rem",
                    marginBottom: "1.5rem",
                    paddingBottom: "0.75rem",
                    borderBottom: "2px solid rgba(59, 130, 246, 0.3)"
                }}>
                    🏗️ Module 3 : Stack Technique & Contexte
                </h2>

                <h3 style={{ color: "#3b82f6", marginBottom: "1rem" }}>Où se produit l&apos;injection ?</h3>
                <div className="terminal" style={{ marginBottom: "1.5rem" }}>
                    <pre style={{ margin: 0, fontSize: "0.9rem" }}>
                        {`┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│    FRONTEND     │────▶│    BACKEND      │────▶│    DATABASE     │
│   (Navigateur)  │     │    (Serveur)    │     │   (PostgreSQL)  │
└─────────────────┘     └─────────────────┘     └─────────────────┘
        │                       │                       │
   User Input              Construire            Exécuter
   "admin'--"              la requête             le SQL
                                │
                    ┌───────────┴───────────┐
                    │  POINT D'INJECTION    │
                    │                       │
                    │  Si l'input n'est pas │
                    │  sanitizé, l'attaque  │
                    │  est possible ici !   │
                    └───────────────────────┘`}
                    </pre>
                </div>

                <h3 style={{ color: "#3b82f6", marginBottom: "1rem" }}>Technologies concernées</h3>
                <p style={{ color: "#a1a1aa", marginBottom: "1rem" }}>
                    Les injections SQL peuvent affecter <strong>tous les langages</strong> qui interagissent avec une base de données :
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: "1rem" }}>
                    {[
                        { lang: "PHP", icon: "🐘", risk: "Très courant" },
                        { lang: "Python", icon: "🐍", risk: "Courant" },
                        { lang: "Node.js", icon: "💚", risk: "Courant" },
                        { lang: "Java", icon: "☕", risk: "Modéré" },
                        { lang: "Ruby", icon: "💎", risk: "Modéré" },
                        { lang: "C#/.NET", icon: "🔷", risk: "Modéré" }
                    ].map((tech, i) => (
                        <div key={i} style={{
                            textAlign: "center",
                            padding: "1rem",
                            background: "rgba(15, 15, 25, 0.5)",
                            borderRadius: "8px"
                        }}>
                            <div style={{ fontSize: "2rem" }}>{tech.icon}</div>
                            <div style={{ fontWeight: 600 }}>{tech.lang}</div>
                            <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>{tech.risk}</div>
                        </div>
                    ))}
                </div>

                <h3 style={{ color: "#3b82f6", marginBottom: "1rem", marginTop: "1.5rem" }}>Notre Stack (CryptoVault)</h3>
                <div style={{
                    padding: "1rem",
                    background: "rgba(59, 130, 246, 0.1)",
                    borderRadius: "8px",
                    borderLeft: "3px solid #3b82f6"
                }}>
                    <ul style={{ margin: 0, paddingLeft: "1.5rem", lineHeight: 2 }}>
                        <li><strong>Frontend :</strong> Next.js 14 (React) avec App Router</li>
                        <li><strong>Backend :</strong> Next.js API Routes (serverless)</li>
                        <li><strong>Base de données :</strong> PostgreSQL (Neon - serverless)</li>
                        <li><strong>Déploiement :</strong> Vercel</li>
                        <li><strong>Driver SQL :</strong> pg (node-postgres)</li>
                    </ul>
                </div>
            </section>

            {/* Module 4 - Exercices */}
            <section id="module-4" className="card" style={{ marginBottom: "2rem" }}>
                <h2 style={{
                    fontSize: "1.75rem",
                    marginBottom: "1.5rem",
                    paddingBottom: "0.75rem",
                    borderBottom: "2px solid rgba(236, 72, 153, 0.3)"
                }}>
                    💻 Module 4 : Exercices Pratiques
                </h2>

                {/* Exercise 1 */}
                <div id="exercise-1" style={{
                    marginBottom: "2rem",
                    padding: "1.5rem",
                    background: "rgba(15, 15, 25, 0.5)",
                    borderRadius: "12px",
                    border: "1px solid rgba(0, 255, 136, 0.2)"
                }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                        <h3 style={{ color: "#00ff88" }}>Exercice 1 : Login Bypass</h3>
                        <span style={{ color: "#fbbf24" }}>⭐ Facile</span>
                    </div>
                    <p style={{ color: "#a1a1aa", marginBottom: "1rem" }}>
                        <strong>Objectif :</strong> Se connecter en tant qu&apos;administrateur sans connaître le mot de passe.
                    </p>
                    <Link href="/login" className="btn-primary" style={{ marginRight: "1rem" }}>
                        🎯 Aller au Login →
                    </Link>

                    <details style={{ marginTop: "1.5rem" }}>
                        <summary style={{ cursor: "pointer", color: "#a855f7" }}>💡 Indice</summary>
                        <p style={{ marginTop: "0.5rem", padding: "1rem", background: "rgba(0,0,0,0.3)", borderRadius: "8px" }}>
                            Les commentaires SQL (<code>--</code>) permettent d&apos;ignorer le reste de la requête.
                            Si le username devient <code>admin&apos;--</code>, que devient la requête ?
                        </p>
                    </details>

                    <details style={{ marginTop: "1rem" }}>
                        <summary style={{ cursor: "pointer", color: "#ef4444" }}>🔑 Solution</summary>
                        <div style={{ marginTop: "0.5rem", padding: "1rem", background: "rgba(0,0,0,0.3)", borderRadius: "8px" }}>
                            <p><strong>Username :</strong> <code style={{ color: "#00ff88" }}>admin&apos;--</code></p>
                            <p><strong>Password :</strong> n&apos;importe quoi</p>
                            <p style={{ marginTop: "0.5rem", color: "#6b7280" }}>
                                La requête devient :<br />
                                <code>SELECT * FROM users WHERE username = &apos;admin&apos;-- AND password = &apos;...&apos;</code><br />
                                La partie après <code>--</code> est ignorée !
                            </p>
                        </div>
                    </details>
                </div>

                {/* Exercise 2 */}
                <div id="exercise-2" style={{
                    marginBottom: "2rem",
                    padding: "1.5rem",
                    background: "rgba(15, 15, 25, 0.5)",
                    borderRadius: "12px",
                    border: "1px solid rgba(168, 85, 247, 0.2)"
                }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                        <h3 style={{ color: "#a855f7" }}>Exercice 2 : Extraire les Emails</h3>
                        <span style={{ color: "#fbbf24" }}>⭐⭐ Moyen</span>
                    </div>
                    <p style={{ color: "#a1a1aa", marginBottom: "1rem" }}>
                        <strong>Objectif :</strong> Afficher les emails de TOUS les utilisateurs via la recherche.
                    </p>
                    <Link href="/search" className="btn-primary" style={{ marginRight: "1rem" }}>
                        🔍 Aller à la Recherche →
                    </Link>

                    <details style={{ marginTop: "1.5rem" }}>
                        <summary style={{ cursor: "pointer", color: "#a855f7" }}>💡 Indice</summary>
                        <p style={{ marginTop: "0.5rem", padding: "1rem", background: "rgba(0,0,0,0.3)", borderRadius: "8px" }}>
                            Une condition toujours vraie (<code>&apos; OR &apos;1&apos;=&apos;1</code>) fera correspondre toutes les lignes.
                        </p>
                    </details>

                    <details style={{ marginTop: "1rem" }}>
                        <summary style={{ cursor: "pointer", color: "#ef4444" }}>🔑 Solution</summary>
                        <div style={{ marginTop: "0.5rem", padding: "1rem", background: "rgba(0,0,0,0.3)", borderRadius: "8px" }}>
                            <p><strong>Recherche :</strong> <code style={{ color: "#00ff88" }}>&apos; OR &apos;1&apos;=&apos;1&apos;--</code></p>
                            <p style={{ marginTop: "0.5rem", color: "#6b7280" }}>
                                La requête devient :<br />
                                <code>SELECT ... WHERE username LIKE &apos;%&apos; OR &apos;1&apos;=&apos;1&apos;--%&apos;</code><br />
                                Condition toujours vraie = tous les résultats !
                            </p>
                        </div>
                    </details>
                </div>

                {/* Exercise 3 */}
                <div id="exercise-3" style={{
                    marginBottom: "2rem",
                    padding: "1.5rem",
                    background: "rgba(15, 15, 25, 0.5)",
                    borderRadius: "12px",
                    border: "1px solid rgba(239, 68, 68, 0.2)"
                }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                        <h3 style={{ color: "#ef4444" }}>Exercice 3 : UNION Attack - Voler les Secrets</h3>
                        <span style={{ color: "#fbbf24" }}>⭐⭐⭐ Difficile</span>
                    </div>
                    <p style={{ color: "#a1a1aa", marginBottom: "1rem" }}>
                        <strong>Objectif :</strong> Extraire le contenu de la table <code>admin_secrets</code> via une attaque UNION.
                    </p>
                    <Link href="/search" className="btn-primary" style={{ marginRight: "1rem" }}>
                        🔍 Aller à la Recherche →
                    </Link>

                    <details style={{ marginTop: "1.5rem" }}>
                        <summary style={{ cursor: "pointer", color: "#a855f7" }}>💡 Indice 1</summary>
                        <p style={{ marginTop: "0.5rem", padding: "1rem", background: "rgba(0,0,0,0.3)", borderRadius: "8px" }}>
                            UNION permet de combiner les résultats de deux SELECT. Les deux requêtes doivent avoir le même nombre de colonnes.
                            La recherche retourne 2 colonnes (username, email).
                        </p>
                    </details>

                    <details style={{ marginTop: "1rem" }}>
                        <summary style={{ cursor: "pointer", color: "#a855f7" }}>💡 Indice 2</summary>
                        <p style={{ marginTop: "0.5rem", padding: "1rem", background: "rgba(0,0,0,0.3)", borderRadius: "8px" }}>
                            La table <code>admin_secrets</code> a les colonnes : <code>secret_name</code> et <code>secret_value</code>
                        </p>
                    </details>

                    <details style={{ marginTop: "1rem" }}>
                        <summary style={{ cursor: "pointer", color: "#ef4444" }}>🔑 Solution</summary>
                        <div style={{ marginTop: "0.5rem", padding: "1rem", background: "rgba(0,0,0,0.3)", borderRadius: "8px" }}>
                            <p><strong>Recherche :</strong></p>
                            <code style={{ color: "#00ff88", display: "block", padding: "0.5rem", background: "rgba(0,0,0,0.5)", borderRadius: "4px" }}>
                                &apos; UNION SELECT secret_name, secret_value FROM admin_secrets--
                            </code>
                            <p style={{ marginTop: "0.5rem", color: "#6b7280" }}>
                                Cela ajoute les secrets aux résultats de recherche !
                            </p>
                        </div>
                    </details>
                </div>

                {/* Exercise 4 */}
                <div id="exercise-4" style={{
                    padding: "1.5rem",
                    background: "rgba(15, 15, 25, 0.5)",
                    borderRadius: "12px",
                    border: "1px solid rgba(236, 72, 153, 0.2)"
                }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                        <h3 style={{ color: "#ec4899" }}>Exercice 4 : Extraire les Mots de Passe</h3>
                        <span style={{ color: "#fbbf24" }}>⭐⭐⭐⭐ Expert</span>
                    </div>
                    <p style={{ color: "#a1a1aa", marginBottom: "1rem" }}>
                        <strong>Objectif :</strong> Récupérer tous les mots de passe des utilisateurs en clair.
                    </p>
                    <Link href="/search" className="btn-primary" style={{ marginRight: "1rem" }}>
                        🔍 Aller à la Recherche →
                    </Link>

                    <details style={{ marginTop: "1.5rem" }}>
                        <summary style={{ cursor: "pointer", color: "#a855f7" }}>💡 Indice</summary>
                        <p style={{ marginTop: "0.5rem", padding: "1rem", background: "rgba(0,0,0,0.3)", borderRadius: "8px" }}>
                            La table <code>users</code> contient les colonnes <code>username</code> et <code>password</code>.
                            Utilisez une attaque UNION similaire à l&apos;exercice 3.
                        </p>
                    </details>

                    <details style={{ marginTop: "1rem" }}>
                        <summary style={{ cursor: "pointer", color: "#ef4444" }}>🔑 Solution</summary>
                        <div style={{ marginTop: "0.5rem", padding: "1rem", background: "rgba(0,0,0,0.3)", borderRadius: "8px" }}>
                            <p><strong>Recherche :</strong></p>
                            <code style={{ color: "#00ff88", display: "block", padding: "0.5rem", background: "rgba(0,0,0,0.5)", borderRadius: "4px" }}>
                                &apos; UNION SELECT username, password FROM users--
                            </code>
                        </div>
                    </details>
                </div>
            </section>

            {/* Module 5 - Protection */}
            <section id="module-5" className="card" style={{ marginBottom: "2rem" }}>
                <h2 style={{
                    fontSize: "1.75rem",
                    marginBottom: "1.5rem",
                    paddingBottom: "0.75rem",
                    borderBottom: "2px solid rgba(34, 197, 94, 0.3)"
                }}>
                    🛡️ Module 5 : Comment se Protéger
                </h2>

                <h3 style={{ color: "#22c55e", marginBottom: "1rem" }}>1. Requêtes Paramétrées (Prepared Statements)</h3>
                <p style={{ color: "#a1a1aa", marginBottom: "1rem" }}>
                    C&apos;est LA solution principale. Les paramètres sont traités comme des données, pas du code SQL.
                </p>
                <div className="code-block" style={{ marginBottom: "1.5rem" }}>
                    <pre style={{ margin: 0 }}>
                        <span className="syntax-comment">// ❌ VULNÉRABLE</span>{"\n"}
                        <span className="syntax-keyword">const</span> query = <span className="syntax-string">`SELECT * FROM users WHERE id = $&#123;userId&#125;`</span>;{"\n"}
                        db.<span className="syntax-function">query</span>(query);{"\n\n"}
                        <span className="syntax-comment">// ✅ SÉCURISÉ - Paramètres séparés</span>{"\n"}
                        <span className="syntax-keyword">const</span> query = <span className="syntax-string">&apos;SELECT * FROM users WHERE id = $1&apos;</span>;{"\n"}
                        db.<span className="syntax-function">query</span>(query, [userId]); <span className="syntax-comment">// userId traité comme donnée</span>
                    </pre>
                </div>

                <h3 style={{ color: "#22c55e", marginBottom: "1rem" }}>2. Utiliser un ORM</h3>
                <p style={{ color: "#a1a1aa", marginBottom: "1rem" }}>
                    Les ORMs (Prisma, Drizzle, Sequelize) génèrent automatiquement des requêtes sécurisées.
                </p>
                <div className="code-block" style={{ marginBottom: "1.5rem" }}>
                    <pre style={{ margin: 0 }}>
                        <span className="syntax-comment">// Avec Prisma - automatiquement sécurisé</span>{"\n"}
                        <span className="syntax-keyword">const</span> user = <span className="syntax-keyword">await</span> prisma.user.<span className="syntax-function">findUnique</span>(&#123;{"\n"}
                        {"  "}<span className="syntax-keyword">where</span>: &#123; username: userInput &#125;{"\n"}
                        &#125;);
                    </pre>
                </div>

                <h3 style={{ color: "#22c55e", marginBottom: "1rem" }}>3. Validation des Entrées</h3>
                <div style={{
                    padding: "1rem",
                    background: "rgba(34, 197, 94, 0.1)",
                    borderRadius: "8px",
                    marginBottom: "1.5rem"
                }}>
                    <ul style={{ margin: 0, paddingLeft: "1.5rem", lineHeight: 2 }}>
                        <li><strong>Whitelist :</strong> N&apos;accepter que les caractères autorisés (ex: alphanumériques)</li>
                        <li><strong>Longueur max :</strong> Limiter la taille des inputs</li>
                        <li><strong>Type checking :</strong> Valider que les nombres sont des nombres</li>
                        <li><strong>Échapper les caractères spéciaux :</strong> Convertir <code>&apos;</code> en <code>&apos;&apos;</code></li>
                    </ul>
                </div>

                <h3 style={{ color: "#22c55e", marginBottom: "1rem" }}>4. Principe du Moindre Privilège</h3>
                <p style={{ color: "#a1a1aa", marginBottom: "1rem" }}>
                    L&apos;utilisateur de la base de données ne devrait avoir que les droits nécessaires.
                </p>
                <div className="code-block" style={{ marginBottom: "1.5rem" }}>
                    <pre style={{ margin: 0 }}>
                        <span className="syntax-comment">-- Créer un utilisateur avec droits limités</span>{"\n"}
                        <span className="syntax-keyword">CREATE USER</span> app_user <span className="syntax-keyword">WITH PASSWORD</span> <span className="syntax-string">&apos;...&apos;</span>;{"\n"}
                        <span className="syntax-keyword">GRANT SELECT, INSERT, UPDATE ON</span> users <span className="syntax-keyword">TO</span> app_user;{"\n"}
                        <span className="syntax-comment">-- Pas de DROP, DELETE sur tables critiques !</span>
                    </pre>
                </div>

                <h3 style={{ color: "#22c55e", marginBottom: "1rem" }}>5. WAF (Web Application Firewall)</h3>
                <p style={{ color: "#a1a1aa" }}>
                    Un WAF peut détecter et bloquer les patterns d&apos;injection SQL connus.
                    Exemples : Cloudflare WAF, AWS WAF, ModSecurity.
                </p>
            </section>

            {/* Module 6 - Challenge Final */}
            <section id="module-6" className="card" style={{
                marginBottom: "2rem",
                background: "linear-gradient(135deg, rgba(168, 85, 247, 0.15), rgba(0, 255, 136, 0.15))",
                border: "1px solid rgba(168, 85, 247, 0.3)"
            }}>
                <h2 style={{
                    fontSize: "1.75rem",
                    marginBottom: "1.5rem",
                    paddingBottom: "0.75rem",
                    borderBottom: "2px solid rgba(0, 255, 136, 0.5)"
                }}>
                    🏆 Module 6 : Challenge Final - Capture The Flag
                </h2>

                <div style={{ textAlign: "center", marginBottom: "2rem" }}>
                    <div style={{
                        fontSize: "4rem",
                        marginBottom: "1rem"
                    }}>
                        🎯
                    </div>
                    <h3 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>Mission : Obtenir le FLAG Secret</h3>
                    <p style={{ color: "#a1a1aa" }}>
                        Quelque part dans la base de données se cache un flag au format <code>FLAG&#123;...&#125;</code>.
                        <br />Votre mission : le trouver et le capturer !
                    </p>
                </div>

                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "1rem",
                    marginBottom: "2rem"
                }}>
                    {[
                        { step: "1", title: "Reconnaissance", desc: "Identifier les points d'entrée vulnérables" },
                        { step: "2", title: "Énumération", desc: "Découvrir la structure de la base" },
                        { step: "3", title: "Extraction", desc: "Récupérer les données sensibles" },
                        { step: "4", title: "Capture", desc: "Obtenir le FLAG !" }
                    ].map((item, i) => (
                        <div key={i} style={{
                            textAlign: "center",
                            padding: "1.5rem",
                            background: "rgba(15, 15, 25, 0.5)",
                            borderRadius: "12px"
                        }}>
                            <div style={{
                                width: "40px",
                                height: "40px",
                                borderRadius: "50%",
                                background: "linear-gradient(135deg, #a855f7, #00ff88)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                margin: "0 auto 0.75rem",
                                fontWeight: 700
                            }}>
                                {item.step}
                            </div>
                            <div style={{ fontWeight: 600, marginBottom: "0.25rem" }}>{item.title}</div>
                            <div style={{ fontSize: "0.85rem", color: "#6b7280" }}>{item.desc}</div>
                        </div>
                    ))}
                </div>

                <div style={{ textAlign: "center" }}>
                    <Link href="/search" className="btn-primary" style={{
                        padding: "1rem 2rem",
                        fontSize: "1.1rem"
                    }}>
                        🚀 Commencer le Challenge →
                    </Link>
                    <p style={{ marginTop: "1rem", color: "#6b7280", fontSize: "0.9rem" }}>
                        💡 Indice : Le flag se trouve dans une table mystérieuse...
                    </p>
                </div>
            </section>

            {/* Conclusion */}
            <section className="card" style={{ textAlign: "center" }}>
                <h2 style={{ marginBottom: "1rem" }}>🎓 Félicitations !</h2>
                <p style={{ color: "#a1a1aa", maxWidth: "600px", margin: "0 auto 1.5rem" }}>
                    Vous avez maintenant les connaissances pour comprendre les injections SQL,
                    les exploiter à des fins éducatives, et surtout protéger vos applications contre ces attaques.
                </p>
                <div style={{
                    padding: "1rem",
                    background: "rgba(239, 68, 68, 0.1)",
                    borderRadius: "8px",
                    border: "1px solid rgba(239, 68, 68, 0.3)"
                }}>
                    <p style={{ color: "#ef4444", fontWeight: 600, margin: 0 }}>
                        ⚠️ N&apos;utilisez ces connaissances que sur des systèmes que vous êtes autorisé à tester.
                        Le piratage non autorisé est illégal.
                    </p>
                </div>
            </section>
        </div>
    );
}
