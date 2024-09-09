def test_hello_world(capsys):
    from backend.src.hello import hello_world
    hello_world()
    captured = capsys.readouterr()
    assert captured.out == 'Hello World!\n'
