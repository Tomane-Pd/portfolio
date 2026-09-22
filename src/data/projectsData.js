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
    id: 'stock-price-lstm',
    title: 'Stock Price Prediction with LSTM',
    category: 'Machine Learning',
    image: '/images/projects/stock-lstm.svg',
    description: 'Deep learning model (LSTM recurrent neural network) that forecasts Apple (AAPL) daily closing prices from the previous 60 trading days, benchmarked against a naive baseline.',
    problem: 'Stock prices are noisy time series. The goal was to test how well a recurrent neural network can learn price dynamics from historical data alone, and to evaluate it honestly against a simple baseline.',
    objectives: [
      'Download 12 years of AAPL prices (2014–2025) with yfinance',
      'Build 60-day sliding windows and scale prices with MinMaxScaler',
      'Train a stacked LSTM network with TensorFlow/Keras',
      'Evaluate with MAE, RMSE, MAPE, R² and directional accuracy against a naive baseline'
    ],
    methodology: 'Closing prices (3,017 trading days) were normalised to [0,1] and split chronologically: 80% for training and 20% for validation. Each sample uses the previous 60 days to predict the next close. The architecture has two LSTM layers (50 units each) followed by Dense(25) and Dense(1), trained with Adam and MSE loss for 5 epochs (batch size 16). Predictions were inverse-transformed to USD and compared with actual prices and with a "tomorrow = today" baseline.',
    technologies: ['Python', 'TensorFlow / Keras', 'LSTM', 'yfinance', 'Scikit-learn', 'Pandas', 'NumPy', 'Matplotlib'],
    results: [
      'R² of 0.93 on the validation period (Aug 2023 – Dec 2025)',
      'MAE of 6.18 USD and MAPE of 2.84%',
      'RMSE of 7.89 USD, versus 3.47 USD for the naive baseline',
      'Directional accuracy close to 50%, showing the model tracks the level but not the next-day direction'
    ],
    lessons: 'A high R² on price levels can be misleading: the naive "same as yesterday" baseline beat the LSTM on RMSE, and the model could not predict daily direction. Always compare a model with a simple baseline before drawing conclusions. This project is academic and is not financial advice.',
    status: 'Completed',
    date: '2026',
    github: null,
    live: null,
    code: null,
    notebooks: [
      { label: 'Stock Price Prediction (LSTM)', file: 'stock-price-lstm' }
    ],
    materials: []
  },
  {
    id: 'olympic-medals-prediction',
    title: 'Olympic Medals Prediction',
    category: 'Machine Learning',
    image: '/images/projects/olympic-medals.svg',
    description: 'Linear regression model that predicts how many medals a country will win at the Olympic Games, based on team size and past performance.',
    problem: 'Can we estimate a country\'s Olympic medal count from simple, available information such as the number of athletes it sends and the medals it won in previous Games?',
    objectives: [
      'Explore the relationship between medals and team characteristics',
      'Clean the dataset and handle missing values',
      'Train a model with a time-aware train/test split',
      'Measure the error overall and per country'
    ],
    methodology: 'Exploratory analysis with a correlation heatmap and regression plots showed that the number of athletes (r = 0.84) and medals from the previous Games (r = 0.92) are strongly related to medals won, while age, height and weight are not. Rows with missing values were removed. Because the data is a time series, Games before 2012 were used for training (1,609 rows) and 2012 and 2016 for testing (405 rows). A Scikit-learn LinearRegression model was trained on athletes and prev_medals; predictions were rounded and negative values set to zero.',
    technologies: ['Python', 'Scikit-learn', 'Linear Regression', 'Pandas', 'NumPy', 'Seaborn', 'Matplotlib'],
    results: [
      'Mean absolute error of 3.3 medals per country per Games',
      'Error far below the standard deviation of medals (33.6)',
      'Very accurate for large delegations (e.g. France, Canada, New Zealand, Russia)',
      'Per-country error ratio analysis to find where the model struggles'
    ],
    lessons: 'Splitting by time instead of randomly avoids using the future to predict the past. Next steps: add more predictors and try other models such as Random Forest or neural networks.',
    status: 'Completed',
    date: '2026',
    github: null,
    live: null,
    code: null,
    notebooks: [
      { label: 'Olympic Medals Prediction', file: 'olympic-medals-prediction' }
    ],
    materials: []
  },
  {
    id: 'traffic-accidents-analysis',
    title: 'Traffic Accidents Geospatial Analysis',
    category: 'Data Science',
    image: '/images/projects/traffic-accidents.svg',
    description: 'Geospatial and temporal analysis of road accident records with interactive heat maps, marker clusters and yearly trend charts.',
    problem: 'Accident records with coordinates are hard to interpret as a table. Mapping them reveals where accidents concentrate and how their frequency changes over time, which supports road-safety planning.',
    objectives: [
      'Load and clean the accidents dataset (remove records without coordinates)',
      'Build an interactive heat map of accident density',
      'Group nearby accidents with marker clusters',
      'Analyse the number of accidents per year'
    ],
    methodology: 'The CSV dataset was loaded with Pandas and rows without latitude/longitude were dropped. Folium was used to create an interactive heat map (HeatMap plugin, tuned radius and blur) and a MarkerCluster map. Dates were converted to datetime, accidents were counted per year and plotted with Matplotlib, using a colour gradient proportional to the yearly total.',
    technologies: ['Python', 'Pandas', 'Folium', 'Leaflet', 'Matplotlib', 'GIS', 'Data Wrangling'],
    results: [
      'Interactive heat map showing accident hotspots',
      'Clustered map to explore accidents by area',
      'Yearly accident frequency chart with colour gradient'
    ],
    lessons: 'Geospatial visualisation turns raw coordinates into insight quickly. Very large point layers make maps heavy, so aggregation (heat maps, clusters) is essential.',
    status: 'Completed',
    date: '2026',
    github: null,
    live: null,
    code: null,
    notebooks: [
      { label: 'Traffic Accidents Analysis', file: 'traffic-accidents-analysis' }
    ],
    materials: []
  },
  {
    id: 'ecg-signal-analysis',
    title: 'ECG Signal Processing with Python',
    category: 'Data Science',
    image: '/images/projects/ecg-signal.svg',
    description: 'Processing and visualisation of an electrocardiogram (ECG) signal with Python, as a first step towards heart-beat analysis.',
    problem: 'Biomedical signals such as ECGs contain thousands of samples per minute. Loading, structuring and visualising them correctly is the foundation for any later analysis, such as detecting heart beats.',
    objectives: [
      'Load a real ECG recording with SciPy',
      'Convert the signal into a Pandas series',
      'Visualise the full signal and zoom into individual heart beats'
    ],
    methodology: 'The electrocardiogram sample dataset from SciPy (sampled at 360 Hz) was loaded as a NumPy array, converted to a Pandas Series and plotted. A zoom on the first 720 samples (about 2 seconds) shows individual heart beats and the characteristic QRS complexes.',
    technologies: ['Python', 'SciPy', 'Pandas', 'NumPy', 'Matplotlib', 'Signal Processing'],
    results: [
      'Full ECG signal visualised',
      'Zoomed view of individual heart beats',
      'Base pipeline ready for peak detection and heart-rate calculation'
    ],
    lessons: 'Working with signals requires attention to the sampling rate: it links sample indices to real time.',
    status: 'Active',
    date: '2026',
    github: null,
    live: null,
    code: null,
    notebooks: [
      { label: 'ECG with Python', file: 'ecg-signal-analysis' }
    ],
    materials: []
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
    id: 'youtube-downloader',
    title: 'YouTube Video & Playlist Downloader',
    category: 'Automation',
    image: '/images/projects/youtube-downloader.svg',
    description: 'Python scripts that download single videos or complete playlists in the best available quality, with resume support and duplicate protection.',
    problem: 'Saving videos and full playlists for offline learning by hand is slow and error-prone, especially when downloads are interrupted.',
    objectives: [
      'Download a single video with a few lines of code',
      'Download a full playlist into a dedicated folder with numbered file names',
      'Merge the best video and audio streams into MP4',
      'Resume interrupted downloads and skip videos already downloaded'
    ],
    methodology: 'Built with the yt-dlp library. The playlist version combines the best video and audio streams ("bestvideo*+bestaudio/best"), merges them into MP4, names files as "001 - Title.mp4", keeps a download archive to avoid duplicates, ignores unavailable videos and retries up to 10 times on errors.',
    technologies: ['Python', 'yt-dlp', 'FFmpeg', 'Automation'],
    results: [
      'Whole playlists downloaded in one run',
      'Interrupted downloads resume automatically',
      'No duplicate downloads thanks to the download archive'
    ],
    lessons: 'Small automation scripts save hours of repetitive work. Use them only for content you have the right to download.',
    status: 'Completed',
    date: '2026',
    github: null,
    live: null,
    code: null,
    notebooks: [
      { label: 'Playlist — best quality', file: 'youtube-playlist-hq' },
      { label: 'Playlist — basic', file: 'youtube-playlist' },
      { label: 'Single video', file: 'youtube-single-video' }
    ],
    materials: []
  },
  {
    id: 'pythonize-com-tomane',
    title: 'Pythonize com Tomane — Python Tips Series',
    category: 'Automation',
    image: '/images/projects/pythonize.svg',
    description: 'A series of short, practical Python tutorials (in Portuguese) that automate everyday tasks and apply Python to real fields: downloading videos, removing image backgrounds, converting, protecting and compressing files, finding duplicates, creating QR codes, comparing prices, web scraping, planning study reviews, and agronomy and soil mapping.',
    problem: 'Many people spend time on repetitive computer tasks that a few lines of Python can solve. This series shows how, step by step, for beginners.',
    objectives: [
      'Teach Python through small, useful, real-life scripts',
      'Keep each tutorial to three steps: install, import, run',
      'Share knowledge about Python, AI, Data Science and Automation'
    ],
    methodology: 'Each episode is a Jupyter notebook with a short explanation and ready-to-use code: #001 download YouTube videos (yt-dlp), #002 remove image backgrounds (rembg), #003 convert images to PDF (Pillow), #004 rename files in bulk (os), #005 encrypt any file (cryptography/Fernet), #006 password-protect a PDF (pypdf), #007 create QR codes (qrcode), #009 find duplicate files by content (hashlib/SHA-256), #010 compress a folder to ZIP (shutil), #011 agronomy dashboard with disease progress, climate and soil data (NumPy, Matplotlib), #012 soil pH and organic carbon maps with IDW interpolation, #021 compare package sizes and market prices against a budget, #022 track pantry label dates, #023 web scraping quotes across pages (requests, BeautifulSoup, CSV), #024 scrape and compare book prices and ratings, #026 spaced-repetition study review calendar exported to CSV.',
    technologies: ['Python', 'yt-dlp', 'rembg', 'Pillow', 'cryptography', 'pypdf', 'qrcode', 'hashlib', 'NumPy', 'Matplotlib', 'requests', 'BeautifulSoup', 'Web Scraping', 'Jupyter'],
    results: [
      '16 tutorials published',
      'Ready-to-use scripts for everyday automation',
      'Beginner-friendly content in Portuguese'
    ],
    lessons: 'Simple, well-explained examples are the best way to get people started with programming.',
    status: 'Active',
    date: '2026',
    github: null,
    live: null,
    code: null,
    notebooks: [
      { label: '#001 · Download YouTube videos', file: 'pythonize-001-youtube' },
      { label: '#002 · Remove image background', file: 'pythonize-002-remove-background' },
      { label: '#003 · Convert image to PDF', file: 'pythonize-003-image-to-pdf' },
      { label: '#004 · Rename files in bulk', file: 'pythonize-004-rename-files' },
      { label: '#005 · Encrypt any file', file: 'pythonize-005-encrypt-file' },
      { label: '#006 · Password-protect a PDF', file: 'pythonize-006-pdf-password' },
      { label: '#007 · Create a QR code', file: 'pythonize-007-qr-code' },
      { label: '#009 · Find duplicate files', file: 'pythonize-009-duplicate-files' },
      { label: '#010 · Compress a folder to ZIP', file: 'pythonize-010-zip-folder' },
      { label: '#011 · Agronomy with Python', file: 'pythonize-011-agronomy' },
      { label: '#012 · Soil pH & carbon maps', file: 'pythonize-012-soil-maps' },
      { label: '#021 · Compare market prices', file: 'pythonize-021-market-prices' },
      { label: '#022 · Organise pantry dates', file: 'pythonize-022-pantry-dates' },
      { label: '#023 · Web scraping quotes', file: 'pythonize-023-web-scraping' },
      { label: '#024 · Compare book prices (scraping)', file: 'pythonize-024-book-prices' },
      { label: '#026 · Study review calendar', file: 'pythonize-026-review-calendar' }
    ],
    materials: []
  }
]
