// src/data/projectsData.js
// Fonte única dos projetos - usada por Projects.jsx, ProjectDetail.jsx e AdminContext
export const projectsData = [
  {
    id: 'pmeal360',
    title: 'PMEAL Explorer 360',
    category: 'Platform',
    image: '/images/projects/pmeal360.jpg',
    description: 'Integrated platform for project management, MEAL, data analytics, GIS, and reporting for development and humanitarian organizations.',
    problem: 'Development and humanitarian organizations struggle with fragmented data systems, making it difficult to track project progress, monitor outcomes, and generate actionable insights for decision-making.',
    objectives: [
      'Create a unified platform for project management and MEAL',
      'Integrate data from multiple sources for comprehensive analysis',
      'Provide real-time dashboards and reporting capabilities',
      'Enable evidence-based decision-making for organizations'
    ],
    methodology: 'The platform was developed using a user-centered design approach, with input from MEAL specialists, project managers, and data analysts. It combines React frontend with Python backend, integrating machine learning models for predictive analytics.',
    technologies: ['React', 'Python', 'Machine Learning', 'Power BI', 'GIS', 'PostgreSQL', 'Docker'],
    results: [
      'Reduced reporting time by 60%',
      'Improved data accuracy and consistency',
      'Enabled real-time project monitoring',
      'Enhanced decision-making capabilities'
    ],
    lessons: 'The importance of user-centered design and iterative development in creating tools that truly meet organizational needs.',
    status: 'Active',
    date: '2024',
    github: 'https://github.com/Tomane-Pd/pmeal360',
    live: 'https://pmeal360.com',
    code: null,
    materials: [
      { type: 'code', label: 'Python Backend Code', icon: 'Code', url: '#' },
      { type: 'code', label: 'React Frontend Code', icon: 'FileCode', url: '#' },
      { type: 'document', label: 'Technical Documentation', icon: 'FileText', url: '#' },
      { type: 'document', label: 'User Manual', icon: 'FileText', url: '#' },
      { type: 'dashboard', label: 'Power BI Dashboard', icon: 'BarChart3', url: '#' },
      { type: 'image', label: 'Platform Screenshots', icon: 'Image', url: '#' },
      { type: 'video', label: 'Demo Video', icon: 'Video', url: '#' }
    ]
  },
  {
    id: 'data-pipeline',
    title: 'Data Integration Pipeline - Fuzzy Matching',
    category: 'Data Engineering',
    image: '/images/projects/python-icon.svg',
    description: 'Python-based solution for integrating multiple Excel sheets and data sources into a unified database using fuzzy matching algorithms.',
    problem: 'Organizations collect data across multiple sheets and sources with inconsistent naming, making it difficult to consolidate and analyze information efficiently.',
    objectives: [
      'Integrate multiple Excel sheets into a single consolidated database',
      'Use fuzzy matching to handle inconsistent data entries',
      'Reduce data aggregation time significantly',
      'Ensure data quality and consistency across sources'
    ],
    methodology: 'Developed a Python script using Pandas for data manipulation and thefuzz library for fuzzy matching. The solution loads multiple sheets, standardizes column names, performs fuzzy matching on key columns, and consolidates all data into a single unified dataset.',
    technologies: ['Python', 'Pandas', 'Fuzzy Matching', 'Excel', 'OpenPyXL', 'Data Integration'],
    results: [
      '95% efficiency gain in data aggregation',
      'Reduced processing time from weeks to minutes',
      'Improved data consistency and accuracy',
      'Unified data from 6 different sheets'
    ],
    lessons: 'Fuzzy matching is a powerful technique for integrating data from sources with inconsistent naming conventions. Automation of this process saves significant time and reduces human error.',
    status: 'Active',
    date: '2024',
    github: 'https://github.com/Tomane-Pd/data-pipeline',
    live: null,
    code: `# Data Integration Pipeline - Fuzzy Matching
import pandas as pd
from thefuzz import process

# Caminho do arquivo
file_path = "Brigadas.xlsx"

# Ordem das abas conforme solicitado
abas = ["CCD", "CCS", "PAV", "PF", "CPN"]

# Carregar todas as abas da planilha
xls = pd.ExcelFile(file_path)
dfs = {aba: xls.parse(aba) for aba in abas}

# Padronizar nomes das colunas
for aba in dfs:
    dfs[aba].columns = dfs[aba].columns.str.strip().str.lower()

# Definir a aba de referência
df_base = dfs["CCS"].copy()

# Colunas-chave para correspondência
keys = ["data", "us", "posto administrativo", "comunidade", "distrito", "provincia"]

# Renomear colunas de cada aba
for aba in dfs:
    for col in dfs[aba].columns:
        if col not in keys:
            dfs[aba].rename(columns={col: f"{aba}-{col}"}, inplace=True)

# Função para fuzzy matching
def fuzzy_merge(df_base, df_merge, keys):
    df_merged = df_base.copy()

    for key in keys:
        df_merge[key] = df_merge[key].astype(str)
        df_base[key] = df_base[key].astype(str)

        matches = df_merge[key].apply(lambda x: process.extractOne(x, df_base[key], score_cutoff=80))
        df_merge[key] = matches.apply(lambda x: x[0] if x else None)

    return pd.merge(df_base, df_merge, on=keys, how="left")

# Criar DataFrame final
df_final = df_base.copy()

for aba in abas:
    if aba != "CCS":
        df_final = fuzzy_merge(df_final, dfs[aba], keys)

df_final.fillna("NAN", inplace=True)

# Salvar no Excel
with pd.ExcelWriter(file_path, engine="openpyxl", mode="a") as writer:
    df_final.to_excel(writer, sheet_name="Consolidado", index=False)

print("Planilha consolidada com sucesso!")`,
    materials: [
      { type: 'code', label: 'Python Script', icon: 'Code', url: '#' },
      { type: 'code', label: 'Complete Pipeline', icon: 'FileCode', url: '#' },
      { type: 'document', label: 'Technical Documentation', icon: 'FileText', url: '#' },
      { type: 'spreadsheet', label: 'Sample Data', icon: 'FileSpreadsheet', url: '#' }
    ]
  },
  {
    id: 'life-expectancy-r',
    title: 'Life Expectancy Analysis in R',
    category: 'Data Science',
    image: '/images/projects/placeholder.svg',
    description: 'Comprehensive analysis of life expectancy factors using R programming.',
    problem: 'Understanding the key factors that influence life expectancy across different countries and regions.',
    objectives: [
      'Analyze life expectancy data using R',
      'Identify key factors affecting life expectancy',
      'Create visualizations to communicate findings',
      'Provide insights for public health policy'
    ],
    methodology: 'Used R programming with tidyverse, ggplot2, and other packages for data analysis and visualization.',
    technologies: ['R', 'Tidyverse', 'ggplot2', 'Data Analysis', 'Statistics'],
    results: [
      'Identified key socio-economic factors affecting life expectancy',
      'Created interactive visualizations',
      'Generated actionable insights for health policy'
    ],
    lessons: 'R is a powerful tool for statistical analysis and data visualization.',
    status: 'Published',
    date: '2024',
    github: 'https://rpubs.com/Padacius/1218951',
    live: 'https://rpubs.com/Padacius/1218951',
    code: null,
    materials: [
      { type: 'link', label: 'View on RPubs', icon: 'ExternalLink', url: 'https://rpubs.com/Padacius/1218951' },
      { type: 'code', label: 'R Script', icon: 'FileCode', url: '#' }
    ]
  }
]
