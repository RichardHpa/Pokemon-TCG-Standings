import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api';
import amplifyconfig from '../../amplifyconfiguration.json';

Amplify.configure(amplifyconfig);

export const client = generateClient();
