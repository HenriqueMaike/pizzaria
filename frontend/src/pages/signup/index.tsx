import Head from "next/head";
import Image from 'next/image';
import styles from '../../../styles/home.module.scss';
import Link from "next/link";
import { toast } from 'react-toastify';

import logoImg from '../../../public/logo.svg';

import { Input } from '../../components/ui/input'

import { AuthContext } from "../../contexts/AuthContext";

import { Button } from '../../components/ui/Button'
import { FormEvent, useState, useContext } from "react";

export default function Signup() {
  const {signUp} = useContext(AuthContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  async function handleSignUp(event: FormEvent){
    event.preventDefault();

    if(name === '' || email === '' || password === ''){
      toast.error('preencha todos os campos', {
        theme: "dark"
      })
      return;
    }

    setLoading(true);

    let data = {
      name,
      email,
      password
    }

    await signUp(data);

    setLoading(false);

  }


  return (
    <>
      <Head>
        <title>SujeitoPizza - Cadastre-se</title>
      </Head>

      <div className={styles.containerCenter}>
        <Image src={logoImg} alt='Logo sujeito programador'/>

        <div className={styles.login}>
            <h1>Criando sua conta</h1>
          <form onSubmit={handleSignUp}>

            <Input 
              placeholder="Digite seu Nome"
              type='text'
              value={name}
              onChange={(e)=> setName(e.target.value)}
              />
              

            <Input 
              placeholder="Digite seu email"
              type='text'
              value={email}
              onChange={(e)=> setEmail(e.target.value)}
              />

            <Input 
              placeholder="Sua senha"
              type='password'
              value={password}
              onChange={(e)=> setPassword(e.target.value)}
              />

            <Button 
              type='submit'
              loading={loading}
            >
              Cadastrar
            </Button>
              
          </form>

          <Link href="/" className={styles.text}>Ja possui uma conta? Login</Link>

        </div>
      </div>

    </>
  )
}
