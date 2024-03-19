-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 01-Dez-2023 às 01:43
-- Versão do servidor: 10.4.24-MariaDB
-- versão do PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `db_produtos`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_pedidos`
--

CREATE TABLE `tb_pedidos` (
  `id` int(11) NOT NULL,
  `produto` varchar(100) NOT NULL,
  `produto2` varchar(100) NOT NULL,
  `produto3` varchar(100) NOT NULL,
  `qtd` int(11) NOT NULL,
  `qtd2` int(11) NOT NULL,
  `qtd3` int(11) NOT NULL,
  `vl1` decimal(6,2) NOT NULL,
  `vl2` decimal(6,2) NOT NULL,
  `vl3` decimal(6,2) NOT NULL,
  `total` decimal(6,2) NOT NULL,
  `cliente` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_produtos`
--

CREATE TABLE `tb_produtos` (
  `id` int(11) NOT NULL,
  `sabor` varchar(40) NOT NULL,
  `categoria` char(1) NOT NULL,
  `valor` decimal(6,2) NOT NULL,
  `foto` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `tb_produtos`
--

INSERT INTO `tb_produtos` (`id`, `sabor`, `categoria`, `valor`, `foto`) VALUES
(1, 'PORTUGUESA', 'A', '45.00', './src/assets/card-images/portuguesa.webp'),
(2, 'PAULISTA', 'A', '35.00', './src/assets/card-images/paulista.jpg'),
(3, 'CALABRESA', 'A', '30.00', './src/assets/card-images/calabresa.jpeg'),
(4, 'PEPPERONI', 'A', '45.00', './src/assets/card-images/pepperoni.avif'),
(5, 'BREADSTICK DE CALABRESA', 'B', '25.00', './src/assets/card-images/breadstick-calabresa.jpg'),
(6, 'BREADSTICK DE PEPPERONI', 'B', '40.00', './src/assets/card-images/breadstick-pepperoni.webp'),
(7, 'BREADSTICK DE QUEIJO', 'B', '40.00', './src/assets/card-images/breadstick-queijo.webp'),
(8, 'BREADSTICK DE CHEDDAR', 'B', '30.00', './src/assets/card-images/breadstick-cheddar.jpg'),
(9, 'PIZZA DE CHOCOLATE', 'C', '40.00', './src/assets/card-images/pizza-chocolate.webp'),
(10, 'PIZZA DE PRESTÍGIO', 'C', '45.00', './src/assets/card-images/pizza-prestigio.jpg'),
(11, 'PIZZA ROMEU E JULIETA', 'C', '45.00', './src/assets/card-images/pizza-romeu-e-julieta.jpg'),
(12, 'PIZZA DE AMENDOIM', 'C', '45.00', './src/assets/card-images/pizza-amendoim.jpg'),
(16, 'COCA COLA', 'D', '10.00', './src/assets/card-images/coca.jpg'),
(17, 'PEPSI', 'D', '8.00', './src/assets/card-images/pepsi.webp'),
(18, 'GUARANÁ ANTARCTICA', 'D', '9.00', './src/assets/card-images/antartica.png'),
(19, 'DOLLY', 'D', '8.00', './src/assets/card-images/dolly.jpg');

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_usuarios`
--

CREATE TABLE `tb_usuarios` (
  `id` int(11) NOT NULL,
  `nome` varchar(50) NOT NULL,
  `email` varchar(255) NOT NULL,
  `senha` varchar(50) NOT NULL,
  `tipo_conta` int(11) NOT NULL,
  `cep` varchar(10) NOT NULL,
  `cidade` varchar(100) NOT NULL,
  `endereco` varchar(100) NOT NULL,
  `estado` varchar(100) NOT NULL,
  `bairro` varchar(100) NOT NULL,
  `casa` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `tb_usuarios`
--

INSERT INTO `tb_usuarios` (`id`, `nome`, `email`, `senha`, `tipo_conta`, `cep`, `cidade`, `endereco`, `estado`, `bairro`, `casa`) VALUES
(1, 'Caio Freitas', 'CAIO@GMAIL.COM', 'caio05@F', 0, '11346-080', 'São Vicente', 'Rua Adão de Jesus Cardoso', 'SP', 'Parque das Bandeiras', '120'),
(2, 'Poo', 'P@GMAIL.COM', 'caio123A@b', 1, '11345-090', 'São Vicente', 'Rua Três', 'SP', 'Jardim Sorocabanos', '12');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `tb_pedidos`
--
ALTER TABLE `tb_pedidos`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `tb_produtos`
--
ALTER TABLE `tb_produtos`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `tb_usuarios`
--
ALTER TABLE `tb_usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `tb_pedidos`
--
ALTER TABLE `tb_pedidos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tb_produtos`
--
ALTER TABLE `tb_produtos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT de tabela `tb_usuarios`
--
ALTER TABLE `tb_usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
