<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
use Slim\Http\UploadedFile;

require './vendor/autoload.php';

$app = new \Slim\App;

$app->get('/pizzas', 'getPizzas');
$app->get('/breadsticks', 'getBreadsticks');
$app->get('/doces', 'getDoces');
$app->get('/bebidas', 'getBebidas');
$app->get('/pedidos', 'getPedidos');
$app->get('/produtos', 'getProdutos');
$app->post('/cadastrarPedidos', 'addPedido');
$app->post('/addProduto', 'addProdutos');
$app->get('/clientes', 'getUsuarios');
$app->post('/cadastroUsuarios', 'cadastrarUsuario');
$app->post('/login', 'realizarLogin');
$app->options('/{routes:.+}', function ($request, $response, $args) {
    return $response;
});

$app->add(function ($req, $res, $next) {
    $response = $next($req, $res);
    return $response
        ->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
});


function getConn()
{
    return new PDO(
        'mysql:host=localhost:3306;dbname=db_produtos',
        'root',
        '',
        array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8")
    );
}

function addProdutos(Request $request, Response $response, array $args)
{

    $arquivos = $request->getUploadedFiles();
    $arquivo = $arquivos['foto'];
    if (isset($arquivo)) {
        $path = "C:\Users\Aluno\pizzaRuth\public\imagens";
        if ($arquivo->getError() === UPLOAD_ERR_OK) {
            $path2 = "../public/imagens/" . moveUploadedFile($path, $arquivo);
            $parsedBody = $request->getParsedBody();
            $sabor = $parsedBody['sabor'];
            $categoria = $parsedBody['categoria'];
            $valor = $parsedBody['valor'];

            $sql = "INSERT INTO tb_produtos (sabor, categoria, valor, foto) VALUES (:sabor, :categoria, :valor, :foto)";
            $stmt = getConn()->prepare($sql);
            $stmt->bindParam(':sabor', $sabor);
            $stmt->bindParam(':valor', $valor);
            $stmt->bindParam(':categoria', $categoria);
            $stmt->bindParam(':foto', $path2);

            if ($stmt->execute()) {
                $response->getBody()->write(json_encode("Produto adicionado com sucesso"));
            } else {
                $response->getBody()->write(json_encode("Erro ao adicionar o produto"));
            }

        } else {
            $response->getBody()->write(json_encode("Não foi possível enviar a imagem"));
        }
    } else {
        $response->getBody()->write(json_encode("Nenhuma imagem foi enviada"));
    }

    return $response;
}

function moveUploadedFile($path, UploadedFile $arquivo)
{
    $extension = pathinfo($arquivo->getClientFilename(), PATHINFO_EXTENSION);
    $basename = bin2hex(random_bytes(8));
    $filename = sprintf('%s.%0.8s', $basename, $extension);

    $arquivo->moveTo($path . DIRECTORY_SEPARATOR . $filename);

    return $filename;
}

function addPedido(Request $request, Response $response, array $args)
{
    $data = $request->getParsedBody();

    $cliente = isset($data['cliente']) ? $data['cliente'] : '';
    $produto = isset($data['produto']) ? $data['produto'] : '';
    $produto2 = isset($data['produto2']) ? $data['produto2'] : '';
    $produto3 = isset($data['produto3']) ? $data['produto3'] : '';
    $qtd = isset($data['qtd']) ? $data['qtd'] : '';
    $qtd2 = isset($data['qtd2']) ? $data['qtd2'] : '';
    $qtd3 = isset($data['qtd3']) ? $data['qtd3'] : '';
    $vl1 = isset($data['vl1']) ? $data['vl1'] : '';
    $vl2 = isset($data['vl2']) ? $data['vl2'] : '';
    $vl3 = isset($data['vl3']) ? $data['vl3'] : '';
    $total = $vl1 * $qtd + $vl2 * $qtd2 + $vl3 * $qtd3;

    $sql = "INSERT INTO tb_pedidos (cliente, produto, produto2, produto3, qtd, qtd2, qtd3, vl1, vl2, vl3, total) VALUES (:cliente, :produto, :produto2, :produto3, :qtd, :qtd2, :qtd3, :vl1, :vl2, :vl3, :total)";
    $stmt = getConn()->prepare($sql);
    $stmt->bindParam(':cliente', $cliente);
    $stmt->bindParam(':produto', $produto);
    $stmt->bindParam(':produto2', $produto2);
    $stmt->bindParam(':produto3', $produto3);
    $stmt->bindParam(':qtd', $qtd);
    $stmt->bindParam(':qtd2', $qtd2);
    $stmt->bindParam(':qtd3', $qtd3);
    $stmt->bindParam(':vl1', $vl1);
    $stmt->bindParam(':vl2', $vl2);
    $stmt->bindParam(':vl3', $vl3);
    $stmt->bindParam(':total', $total);

    if (
        $stmt->execute() && $cliente != '' &&
        $produto != '' &&
        $produto2 != '' &&
        $produto3 != '' &&
        $produto != 'SELECIONE' &&
        $produto2 != 'SELECIONE' &&
        $produto3 != 'SELECIONE' &&
        $qtd != 0 &&
        $qtd2 != 0 &&
        $qtd3 != 0 &&
        $vl1 != 0.00 &&
        $vl2 != 0.00 &&
        $vl3 != 0.00 &&
        $total != 0.00
    ) {
        $response->getBody()->write(json_encode("Pedido efetuado com sucesso!"));
    }
    //Colocar pelos arrays de cada informação depois da validaçao do email
    else if (
        $cliente == '' ||
        $produto == '' ||
        $produto2 == '' ||
        $produto3 == '' ||
        $produto == 'SELECIONE' ||
        $produto2 == 'SELECIONE' ||
        $produto3 == 'SELECIONE' ||
        $qtd == 0 ||
        $qtd2 == 0 ||
        $qtd3 == 0 ||
        $vl1 == 0.00 ||
        $vl2 == 0.00 ||
        $vl3 == 0.00 ||
        $total == 0.00
    ) {
        $response->getBody()->write(json_encode("Por favor selecione todas as opções!"));
    } else {
        $response->getBody()->write(json_encode("Erro ao efetuar pedido"));
    }

    return $response;
}

function cadastrarUsuario(Request $request, Response $response, array $args)
{
    $data = $request->getParsedBody();

    $nome = isset($data['nome']) ? $data['nome'] : '';
    $email = isset($data['email']) ? $data['email'] : '';
    $senha = isset($data['senha']) ? $data['senha'] : '';
    $cep = isset($data['cep']) ? $data['cep'] : '';
    $cidade = isset($data['cidade']) ? $data['cidade'] : '';
    $endereco = isset($data['rua']) ? $data['rua'] : '';
    $estado = isset($data['estado']) ? $data['estado'] : '';
    $bairro = isset($data['bairro']) ? $data['bairro'] : '';
    $casa = isset($data['casa']) ? $data['casa'] : '';

    $sql = "INSERT INTO tb_usuarios (nome, email, senha, cep, cidade, endereco, estado, bairro, casa) VALUES (:nome, :email, :senha, :cep, :cidade, :endereco, :estado, :bairro, :casa)";
    $stmt = getConn()->prepare($sql);
    $stmt->bindParam(':nome', $nome);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':senha', $senha);
    $stmt->bindParam(':cep', $cep);
    $stmt->bindParam(':cidade', $cidade);
    $stmt->bindParam(':endereco', $endereco);
    $stmt->bindParam(':estado', $estado);
    $stmt->bindParam(':bairro', $bairro);
    $stmt->bindParam(':casa', $casa);

    if ($stmt->execute()) {
        return $response->getBody()->write("Cadastrado com sucesso");
    } else {
        $response->getBody()->write("Erro ao cadastrar usuário.");
    }

    return $response;
}

function getUsuarios(Request $request, Response $response, array $args, $cliente)
{

    $sql = "SELECT cep, cidade, endereco, estado, bairro, casa FROM tb_usuarios WHERE email=$cliente";
    $stmt = getConn()->query($sql);
    $usuarios = $stmt->fetchAll(PDO::FETCH_OBJ);
    $response->getBody()->write(json_encode($usuarios));
    return $response;
}

function realizarLogin(Request $request, Response $response, array $args)
{
    $data = $request->getParsedBody();

    $email = isset($data['email']) ? $data['email'] : '';
    $senha = isset($data['senha']) ? $data['senha'] : '';

    // Realize a verificação da senha no banco de dados
    $conn = getConn();
    $sql = "SELECT * FROM tb_usuarios WHERE email=:email";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(":email", $email);
    $stmt->execute();
    $usuario = $stmt->fetchObject();

    if ($usuario) {
        if ($senha === $usuario->senha) {
            return $response->withJson(['message' => 'Login bem-sucedido', 'tipo_conta' => $usuario->tipo_conta]);
        } else {
            return $response->withJson(['error' => 'Credenciais inválidas', 'tipo_conta' => $usuario->tipo_conta], 401);
        }
    } else {
        return $response->withJson(['error' => 'Credenciais inválidas', 'tipo_conta' => $usuario->tipo_conta], 401);
    }
}

function getPedidos(Request $request, Response $response, array $args)
{
    $sql = "SELECT * FROM tb_pedidos";
    $stmt = getConn()->query($sql);
    $pedidos = $stmt->fetchAll(PDO::FETCH_OBJ);
    $response->getBody()->write(json_encode($pedidos));
    return $response;
}

function getProdutos(Request $request, Response $response, array $args)
{
    $sql = "SELECT * FROM tb_produtos";
    $stmt = getConn()->query($sql);
    $produtos = $stmt->fetchAll(PDO::FETCH_OBJ);

    $response->getBody()->write(json_encode($produtos));
    return $response;
}

function getPizzas(Request $request, Response $response, array $args)
{
    $sql = "SELECT * FROM tb_produtos WHERE categoria = 'A'";
    $stmt = getConn()->query($sql);
    $produtos = $stmt->fetchAll(PDO::FETCH_OBJ);

    $response->getBody()->write(json_encode($produtos));
    return $response;
}

function getBreadsticks(Request $request, Response $response, array $args)
{
    $sql = "SELECT * FROM tb_produtos WHERE categoria = 'B'";
    $stmt = getConn()->query($sql);
    $produtos = $stmt->fetchAll(PDO::FETCH_OBJ);

    $response->getBody()->write(json_encode($produtos));
    return $response;
}

function getDoces(Request $request, Response $response, array $args)
{
    $sql = "SELECT * FROM tb_produtos WHERE categoria = 'C'";
    $stmt = getConn()->query($sql);
    $produtos = $stmt->fetchAll(PDO::FETCH_OBJ);

    $response->getBody()->write(json_encode($produtos));
    return $response;
}

function getBebidas(Request $request, Response $response, array $args)
{
    $sql = "SELECT * FROM tb_produtos WHERE categoria = 'D'";
    $stmt = getConn()->query($sql);
    $produtos = $stmt->fetchAll(PDO::FETCH_OBJ);

    $response->getBody()->write(json_encode($produtos));
    return $response;
}

$app->run();
