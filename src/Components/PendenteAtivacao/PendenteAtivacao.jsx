import React from 'react';
import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';

const AccountActivationPending = () => {
  return (
    <div className="min-h-screen bg-[#0A0E45] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <Mail className="mx-auto h-12 w-12 text-[#00C853]" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Conta Criada com Sucesso!</h2>
          <p className="mt-2 text-sm text-gray-600">
            Sua conta foi criada, mas precisa ser ativada pelo administrador do fórum.
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <p className="text-sm text-gray-500 mb-4">
              Um email foi enviado ao administrador para ativar sua conta. Este processo pode levar algum tempo.
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Você receberá uma notificação por email assim que sua conta for ativada.
            </p>
          </div>
          <div>
            <Link
              to="/"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#00C853] hover:bg-[#00A041] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00C853]"
            >
              Voltar para a página de login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountActivationPending;

