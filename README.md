🧪 Tarefas App — Laravel + React
Este é um sistema de gerenciamento de tarefas com Laravel no backend e React no frontend , integrados via API RESTful. Ele permite listar, criar, editar, concluir e excluir tarefas.

🔧 Tecnologias Utilizadas
Backend : Laravel 10 + PHP 8.x
Frontend : React + TypeScript + Vite
Estilo : CSS puro (sem Tailwind ou frameworks)
API : Rotas RESTful usando apiResource
Comunicação : Fetch nativo (sem Axios)

🚀 Como Executar o Projeto
1. Clonar o repositório (se aplicável)
 

git clone https://github.com/seu-usuario/tarefa-app.git 
cd tarefa-app
2. Configurar o Backend (Laravel)
Instale as dependências:
 

composer install
Copie o .env:
 

cp .env.example .env
Gere a chave da app:
 


php artisan key:generate
Execute as migrations:
 

php artisan migrate --seed
Inicie o servidor Laravel:
 

php artisan serve
Acesse: http://localhost:8000 

3. Configurar o Frontend (React + Vite)
Instale as dependências:
 
npm install
Inicie o servidor de desenvolvimento:
 
npm run dev
O frontend estará disponível em: http://localhost:8000

📝 Observações Técnicas

✅ Sobre a API
As rotas estão definidas em routes/api.php com Route::apiResource('tasks', TaskController::class);
A API retorna dados no formato JSON (GET /api/tasks, POST /api/tasks, etc.)

✅ Sobre o Frontend
Todo o código React está em resources/js/
Componentes principais:
Index.tsx: listagem de tarefas + modais
TaskController.php: lógica de estados e chamadas à API
Não usamos TailwindCSS – todo estilo foi feito com CSS puro

✅ Sobre os ícones
Ícones usados nos botões de "Concluir" e "Excluir"
Usamos Font Awesome via CDN diretamente no Blade (app.blade.php)
Nenhuma instalação adicional necessária

✅ Tipagem no TypeScript
Definimos uma interface Task com tipos específicos:
ts

interface Task {
  id: number;
  titulo: string;
  descricao: string | null;
  status: 'pendente' | 'concluída';
}
Isso garante que campos como status só recebam valores válidos
🛠️ Comandos úteis
- php artisan serve
Roda o backend Laravel

-npm run dev
Roda o frontend com Vite

-npm run build
Gera versão de produção do frontend

-php artisan migrate:fresh --seed
Limpa e recria as tabelas do banco
📦 Estrutura do Projeto (destaques)


.
├── resources/
│   ├── js/                # Código React + TypeScript
│   │   ├── icons/           # SVGs ou componentes de ícone (opcional)
│   │   └── pages/           # Páginas React (ex: Index.tsx)
│   └── css/                 # Estilos globais (app.css)
│
├── routes/
│   ├── web.php              # Rotas do Inertia
│   └── api.php              # API RESTful
│
├── app/
│   └── Models/Task.php      # Model da tarefa
│
└── database/
    └── migrations/          # Migrations do banco de dados
