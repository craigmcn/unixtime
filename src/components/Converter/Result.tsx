import { useCallback, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faRedo, faCopy } from '@fortawesome/sharp-duotone-light-svg-icons';
import { DOCUMENT_TITLE, LONG_DATE, RFC_2822, SHORT_DATE, UTC } from '../../lib/constants';
import { IConversion } from '../../lib/types';
import Alert from '../Shared/Alert';
import Section from '../Shared/Section';
import Button from '../Shared/Button';
import useCopyToClipboard from '../../lib/hooks/useCopyToClipboard';
import { getRequestUrl } from '../../lib/functions';

interface IResultProps {
  data: IConversion;
}

const Result = ({ data }: IResultProps) => {
  const { momentDate, time, timezone, error, warning, title } = data;
  const repeatUrl = getRequestUrl({time, timezone, momentDate});

  const [, copy] = useCopyToClipboard();
  const handleCopy = useCallback(() => {
    copy(repeatUrl);
  }, [repeatUrl, copy]);

  useEffect(() => {
    const documentTime = (!timezone || timezone === UTC) ? momentDate.utc() : momentDate.tz(timezone);
    document.title = documentTime.format(LONG_DATE) + ' - ' + DOCUMENT_TITLE;
  }, [momentDate, timezone]);

  return (
    <Section className="card rounded-lg">
      <div className="card__title">
        <h3 id="results-title">{title}</h3>
      </div>

      <div className="card__body">
        {(error || warning) && (
          <Alert type={ error ? 'error' : 'warning' }>
            {error || warning}
          </Alert>
        )}
        <dl id="results">
          <dt className="fw-bold">
            Timestamp
            <a
              className="ms-1"
              href="https://en.wikipedia.org/wiki/Unix_time"
              target="_blank"
              rel="noreferrer"
            >
              <FontAwesomeIcon icon={ faCircleInfo } />
              <span className="visually-hidden">info</span>
            </a>
          </dt>
          <dd>{momentDate?.unix()}</dd>
          <dt className="fw-bold mt-2">
            Coordinated Universal Time
            <a
              className="ms-2"
              href="https://en.wikipedia.org/wiki/Coordinated_Universal_Time"
              target="_blank"
              rel="noreferrer"
            >
              UTC
            </a>
          </dt>
          <dd id="results-utc">
            {momentDate?.utc().format(LONG_DATE)}
            <br />
            {momentDate?.utc().format(SHORT_DATE)}
          </dd>

          {timezone && timezone !== UTC && (
            <>
              <dt className="fw-bold">{timezone}</dt>
              <dd id="results-timezone">
                {momentDate?.tz(timezone).format(LONG_DATE)}
                <br />
                {momentDate?.format(SHORT_DATE)}
              </dd>
            </>
          )}

          <dt className="fw-bold mt-2">ISO 8601</dt>
          <dd>{momentDate?.format('YYYY-MM-DDTHH:mm:ss.SSSZ')}</dd>
          <dt className="fw-bold mt-2">RFC 2822</dt>
          <dd>{momentDate?.format(RFC_2822)}</dd>
        </dl>

        <div className="d-flex gap-1 mt-4">
          <Button
            className="button--sm"
            href={ repeatUrl }
            title="Repeat this request"
          >
            <FontAwesomeIcon icon={ faRedo } size="xs" className="me-2" />
            Repeat
          </Button>

          {navigator?.clipboard && (
            <Button
              className="button--sm"
              title={ `Copy request ${repeatUrl}` }
              onClick={ handleCopy }
            >
              <FontAwesomeIcon icon={ faCopy } size="xs" className="me-2" />
              Copy <span className="visually-hidden">{`${repeatUrl}`}</span>
            </Button>
          )}
        </div>
      </div>
    </Section>
  );

};

export default Result;
