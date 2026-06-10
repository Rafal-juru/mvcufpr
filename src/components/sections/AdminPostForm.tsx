import { useState } from 'react';
import ImageUploader from '../ui/ImageUploader';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export default function AdminPostForm() {
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'Geral',
    image_url: '',
    author: 'UFPR',
  });
  const [adminSecret, setAdminSecret] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch(`${API_URL}/api/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminSecret}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      setMessage('✓ Post criado com sucesso!');
      setFormData({
        title: '',
        excerpt: '',
        content: '',
        category: 'Geral',
        image_url: '',
        author: 'UFPR',
      });
    } catch (error) {
      setMessage(`✗ Erro: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-50 rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Admin - Criar Post</h2>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Chave Admin</label>
        <input
          type="password"
          value={adminSecret}
          onChange={(e) => setAdminSecret(e.target.value)}
          placeholder="Digite a chave secreta admin"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Título *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Título do artigo"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Resumo</label>
          <input
            type="text"
            name="excerpt"
            value={formData.excerpt}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Resumo do artigo"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Conteúdo *</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            rows={8}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Conteúdo do artigo"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Categoria</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option>Geral</option>
              <option>Pesquisa</option>
              <option>Dicas</option>
              <option>Notícias</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Autor</label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        <ImageUploader
          onImageUrl={(url) => setFormData(prev => ({ ...prev, image_url: url }))}
          label="Imagem do Post"
        />

        {message && (
          <div className={`p-3 rounded-md ${message.includes('✓') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {message}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-cesmvc-green text-white py-2 rounded-md font-medium hover:opacity-90 disabled:opacity-50"
        >
          {loading ? 'Criando...' : 'Criar Post'}
        </button>
      </form>
    </div>
  );
}
